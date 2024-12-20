export const ease = [0.41, 0.03, 0.0, 0.995];

export function transform(value: number, init: number[], res: number[]): number {
  if (init.length !== res.length) console.error('init.length must be equal to res.length');

  if (value <= init[0]) return res[0];
  else if (value >= init[init.length - 1]) return res[res.length - 1];

  const values = [];

  for (let i = 0; i < init.length - 1; i++) {
    const f = (y: number) => (y - init[i]) / ((init[i + 1] - init[i]) / (res[i + 1] - res[i])) + res[i];
    values.push({ range: [init[i], init[i + 1]], func: f });
  }

  let x: any | number = values.find((v: any) => value >= v.range[0] && value <= v.range[1]);
  if (!x) return res[0];
  else x = x.func(value);

  if (x < 0) x = Math.abs(1 - x);
  else x = Math.abs(x);

  return x;
}
