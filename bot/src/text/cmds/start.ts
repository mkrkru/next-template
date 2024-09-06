import { Context } from 'telegraf';

export async function run(ctx: Context & any) {
    ctx.reply('started!');
}

export const misc = {
    aliases: ['start'],
    desc: 'Начать работу'
};