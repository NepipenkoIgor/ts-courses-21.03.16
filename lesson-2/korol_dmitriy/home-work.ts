/* start Task 1 */
function isInArray(arr:any[], ...arg:any[]):boolean {
    let result = true;

    for (let i = 0; i < arg.length; i++) {
        //array doesn't include element
        if (arr.indexOf(arg[i]) < 0) {
            return false;
        }
    }

    return result;
}


console.log('===== Test task1 ====');
console.log(isInArray(["true", false, 4, undefined], 4, false, undefined, "true"));
console.log(isInArray(["true", false, 4], 4, false, undefined, "true"));
console.log(isInArray([2, 4, 6, 8], 2, 4, 8));



/* Task2 */
function summator(...arg:string[]):string;
function summator(...arg:number[]):number;
function summator(...arg:any[]):any {
    return arg.reduce((prev, curr) =>
        Number(prev) + Number(curr)
    );
}

console.log('===== Test task2 ====');
console.log(summator(1, 3, 6, 9));
console.log(summator("5", "5", "5", " ", "5", " 5"));


/* Task3 */
function getUnique(...args:any[]):any[] {
    var newArr:any[] = [];
    for (let i = 0; i < args.length; i++) {
        if (newArr.indexOf(args[i]) === -1) {
            newArr.push(args[i]);
        }
    }
    return newArr;
}

function getUnique2(...args:any[]):any[] {
    return args.reduce((a, b) => {
        return a.indexOf(b) === -1 ? a.concat([b]) : a;
    }, []);
}

console.log('===== Test task3 ====');
console.log(getUnique(1, 2, 3, 4, 5, 6, 7, 1, 3, 4, 5, 3, 2, 1, "2", 4, 5));
console.log(getUnique2(1, 2, 3, 4, 5, 6, 7, 1, 3, 4, 5, 3, 2, 1, "2", 4, 5));
let arr = [1, 2, 4];
console.log(getUnique(1, arr, 2, arr));
console.log(getUnique2(1, arr, 2, arr));
console.log(getUnique(1, [1, 2, 3], 2, [1, 2, 3]));
console.log(getUnique2(1, [1, 2, 3], 2, [1, 2, 3]));



/* Task4 */
function changeOrder(str:string):string {
    let wordArr = str.split(' ');
    wordArr = wordArr.map((word) => {
        let charArr = word.split('');
        let alphabeticCharArr = [];

        //grab characters
        let grabChar = (item) => { alphabeticCharArr.push(item); return ' ';};
        charArr = charArr.map((item) => /[a-zA-Z]/.test(item) ? grabChar(item) : item );

        //insert character in reverse order
        charArr = charArr.map((ch) => ch == ' ' ? alphabeticCharArr.pop() : ch);

        return charArr.join('');
    });
    return wordArr.join(' ');
}

let str1 = 's1ta$%r3t 2 hel^low';
console.log('s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh');
console.log(str1 + '  ->  ' + changeOrder(str1));


let str2 = 's1tar3t 2   low5';
console.log('s1tar3t 2   low5  ->  t1rat3s 2   wol5');
console.log(str2 + '  ->  ' + changeOrder(str2));