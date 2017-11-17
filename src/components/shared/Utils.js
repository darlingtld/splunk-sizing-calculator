export const isPositiveNumber = (value) => {
    const number = parseInt(value);
    return !Number.isNaN(number) && number > 0;

};