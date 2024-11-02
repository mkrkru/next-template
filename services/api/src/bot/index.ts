import { message } from "telegraf/filters";
import { join } from "path";
import fs from "fs";
import textHandler from "./text";
import cbHandler from "./cb";
import { Context, Telegraf } from "telegraf";

export interface MyContext extends Context {
  user: never;
  run: () => void;
}

export const bot = new Telegraf<MyContext>(process.env.TOKEN as string);
const cmds = new Map();

fs.readdir(join(__dirname, "./text/cmds"), (err, files) => {
  if (err) return console.error(err);
  files
    .filter((f) =>
      f.endsWith(process.env.TS_NODE_DEV === "true" ? ".ts" : ".js"),
    )
    .forEach(async (f) => {
      const cmd = await import(join(__dirname, "./text/cmds", f));
      cmd.misc.aliases.forEach((a: string) => cmds.set(a, cmd));
    });
});

bot.use((ctx, next) => {
  ctx.run = async () => {
    if (!ctx.text) return;

    const trimmed = ctx.text.trim();
    const cmd = trimmed.startsWith("/")
      ? trimmed.split(" ")[0].slice(1)
      : trimmed.split(" ")[1];

    try {
      await cmds.get(cmd).run(ctx);
    } catch {
      /* empty */
    }
  };

  return next();
});

bot.on(message("text"), textHandler);
bot.on("callback_query", cbHandler);

bot.launch().then();
