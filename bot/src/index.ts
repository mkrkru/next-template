import 'dotenv/config';
import { message } from 'telegraf/filters';
import mongoose from 'mongoose';
import { join } from 'path';
import fs from 'fs';
import textHandler from './text';
import cbHandler from './cb';
import { Context } from 'telegraf';

export const bot = new (require('telegraf').Telegraf)(process.env.TOKEN);
bot.cmds = new Map();

fs.readdir(join(__dirname, './text/cmds'), (err, files) => {
    if (err) return console.error(err);
    files.filter(f => f.endsWith(process.env.TS_NODE_DEV === 'true' ? '.ts' : '.js')).forEach(f => {
        const cmd = require(join(__dirname, './text/cmds', f));
        cmd.misc.aliases.forEach((a: string) => bot.cmds.set(a, cmd));
    });
});

export async function run(ctx: Context & any) {
    const trimmed = ctx.text.trim();
    const cmd = trimmed.startsWith('/')
        ? trimmed.split(' ')[0].slice(1)
        : trimmed.split(' ')[1];

    try {
        await bot.cmds.get(cmd as keyof typeof bot.cmds).run(ctx);
    } catch { }
}

mongoose.connect(`mongodb://${process.env.NODE_ENV === 'production' ? 'mongo' : '127.0.0.1'}/tg-template`);
mongoose.connection.on('connected', () => console.log('[✅DB] Cluster connected!'));

bot.on(message('text'), textHandler);
bot.on('callback_query', cbHandler);

console.log('template bot launched');
bot.launch();
