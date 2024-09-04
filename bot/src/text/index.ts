import { User } from '../models';
import { Context } from 'telegraf';
import { run } from '../';

export default async function textHandler(ctx: Context & any) {
    if (ctx.message.from.is_bot || ctx.message.from.id !== ctx.message.chat.id) return;
    if (ctx.message.text === '/id') return ctx.reply(ctx.from.id);

    const user = await User.findOne({ tg_id: ctx.from.id });
    if (!user) {
        const test = await User.create({ tg_id: ctx.from.id });
        console.log(test);
        await run(ctx);
        return;
    } else ctx.user = user;
}
