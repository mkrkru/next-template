export const logger = process.env.TS_NODE_DEV
  ? {
      redact: ["req.headers.authorization"],
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    }
  : true;

export function makeid(length: number, numberOnly: boolean = false) {
  const characters = numberOnly
    ? "0123456789"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return numberOnly ? parseInt(result) : result;
}

export const expiresIn = "2h";

export function getNum(text: string) {
  const num = parseInt(text);
  if (isNaN(num) || num < 0 || num > 100000)
    return { ok: false, data: "Введите корректное число!" };

  return { ok: true, data: num };
}
