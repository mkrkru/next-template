export function makeid(length: number) {
    const characters = '0123456789';
    let result = '';
    let counter = 0;

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter++;
    }

    return result;
}

export function getNum(text: string) {
    const num = parseInt(text);
    if (isNaN(num) || num < 0 || num > 100000) return { ok: false, data: 'Введите корректное число!' };

    return { ok: true, data: num };
}
