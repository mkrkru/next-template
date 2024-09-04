import { Context } from 'telegraf';
import * as cmds from './cmds';

export default async function cbHandler(ctx: Context & any) {
    const { data } = ctx.update.callback_query;
    const [cmd, payload, ...rest] = data.split('_');

    await cmds[cmd as keyof typeof cmds](ctx, payload, ...rest);
}