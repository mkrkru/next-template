import { Context } from 'telegraf';

export async function test(ctx: Context & any, payload: string, ...rest: string[]) {
    console.log(payload, ...rest);
}