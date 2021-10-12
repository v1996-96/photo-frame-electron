export const plural = (forms, value) => {
    let remainder = value % 100;

    if (remainder > 10 && remainder < 20) {
        return forms[2];
    }

    remainder %= 10;

    return forms[remainder > 1 && remainder < 5 ? 1 : remainder === 1 ? 0 : 2];
};
