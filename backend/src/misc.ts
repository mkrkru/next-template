export function makeid(length: number, numberOnly: boolean = false) {
    const characters = numberOnly ? '0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
    }
    return numberOnly ? parseInt(result) : result;
}

export const expiresIn = '2h';
