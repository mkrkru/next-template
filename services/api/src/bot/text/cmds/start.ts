import { Context } from "telegraf";

export async function run(ctx: Context) {
  await ctx.reply("started!");
}

export const misc = {
  aliases: ["start"],
  desc: "Начать работу",
};
