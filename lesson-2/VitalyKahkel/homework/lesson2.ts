/* Задание 1 */
/**
 * @param target - массив, который может содержать значения любых простых типов и в котором будет вестись поиск
 * @param args - аргументы любого простого типа (rest параметр)
 * @returns {boolean} - будет возвращено true только если ВСЕ аргументы находятся в массиве target, если хотя бы один отсутствует, то false
 */

/**generic ???*/
let isInArray = (target:(number|string|boolean)[], ...args:(number|string|boolean)[]):boolean => {
    for (let arg of args) {
        if (target.indexOf(arg) === -1) {
            return false;
        }
    }
    return true;
}

console.log(isInArray(["1", "5", 30, "word", false], "1", 30, true));
console.log(isInArray(["1", "5", 30, "word", false], false, "1"));

/* Задание 2 */

/**isNaN????*/
let summator = (...args:(number|string)[]):string => {
    let sum = 0;
    for (let arg of args) {
        sum += (typeof arg === "string") ? parseInt(arg) : arg;
    }
    return `Сумма введенных аргументов = ${sum}`;
}

console.log(summator(10, 5, "20"));

/* Задание 3 */
let getUnique = (...args:(number|string|boolean)[]):(number|string|boolean)[] => {
    let result:(number|string|boolean)[] = [];
    for (let arg of args) {
        if (result.indexOf(arg) === -1) {
            result.push(arg);
        }
    }
    return result;
}

console.log(getUnique("1", 10, true, "1", "word", false, 250, true, "1", "hello", 250));

/* Задание 4 */
class ConvertibleStr {
    constructor(private str:string) {
    }

    private convertPart(part:string):string {
        let partLength = part.length;
        let reg:RegExp = /[a-zа-я]/i;
        let partLetters:string[] = part.match(/[a-zа-я]*/gi).join("").split("");
        let tmp:string[] = [];
        for (let i = 0; i < partLength; i++) {
            // если буква
            if (reg.test(part[i])) {
                tmp.push(partLetters.pop());
            } else {
                tmp.push(part[i]);
            }
        }
        return tmp.join("");
    }

    convert():string {
        let result:string = "";
        let parts:string[] = this.str.split(" ");
        for (let part of parts) {
            let newStr = this.convertPart(part);
            result = result + newStr + " ";
        }
        return result.substr(0, result.length - 1)
    }

    getArgument():string {
        return this.str;
    }
}

let q = new ConvertibleStr("sztar3t 2 hellow");
console.log(q.getArgument() + " -> " + q.convert());