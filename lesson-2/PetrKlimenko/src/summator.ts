type genericNumber = (number|string);

export default (...args: genericNumber[]): number => {
    let sum: number = 0;

    for (let arg of args) {
        sum += (typeof arg === "string") ? getNumber(arg) : arg;
    }

    return sum;
}

const getNumber = (str: string): number => (
    isNaN(parseFloat(str)) ? 0 : parseFloat(str)
);
