import { User } from '../models';
import { Context } from 'telegraf';
import { run } from '../';

export default async function textHandler(ctx: Context & any) {
    if (ctx.message.from.is_bot || ctx.message.from.id !== ctx.message.chat.id) return;
    if (ctx.message.text === '/id') return ctx.reply(ctx.from.id);

    const user = await User.findById(ctx.from.id);
    if (!user) ctx.user = await User.create({ _id: ctx.from.id });
    else ctx.user = user;

    await run(ctx);
}
