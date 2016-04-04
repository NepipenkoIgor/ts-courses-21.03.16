/**
 1)
 Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 Возвращает true, если все аргументы, кроме первого входят в первый.
 Первым всегда должен быть массив. */


/**
 * 1) нужно бы было использовать generic, почему только с числами?
 * 2) немного переделать логику if в if тяжело читать (плохая практика)
 * */
type typeF = string|number|boolean;

function isInArray(target:number[], ...args:number[]):boolean {
    for (let i = 0; i < args.length; i++) {
        if (target.indexOf(args[i]) >= 0) {
            if ((i + 1) === args.length) {
                return true
            }
        }
        else {return false}
    }
}
console.log('isInArray = ', isInArray([1, 2], 2, 1));

/**
 2)
 писать функцию summator(), которая сумирует переданые ей аргументы.
 Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено **/

/**
 * isNaN??
 * */

function sumator(...numbers:(string|number)[]):number {
    let numbersArray:number[] = [];
    let count:number = 0;
    for (let i in numbers) {
        let num = numbers[i];
        count += (typeof num === 'string') ? parseInt(num) : num;
    }
    return count
}
console.log('sumator =', sumator('2', 4, '6', 7, 8, 9));

/**
 3)
 Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
 и возвращает массив уникальных элементов. Аргумент не должен изменяться.
 Порядок элементов результирующего массива должен совпадать с порядком,
 в котором они встречаются в оригинальной структуре.
 Специально обрабатывать значение NaN не обязательно. */

/**
 * почему бы не использовать ЕS6 цикл? -> Готово
 * */

let getUnique = (...numbers:number[]):number[] => {
    let returnedArray:number[] = [];
    for (let number of numbers) {
        if (returnedArray.indexOf(number) === -1) {
            returnedArray.push(number);
        }
    }
    return returnedArray;
};
console.log('getUnique = ', getUnique(1, 4, 3, 2, 4, 3));

/**
 4)
 Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
 цифры и специальные символы должны остаться на месте
 s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
 s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
 s1tar3t 2   low5  ->  t1rat3s 2   wol5
 */

//Работает корректно только для одного слова, и у меня проблема со спец символами. Буду рад замечаниям и поправкам
function reverse(string:string):string {
    let returnStr:string = '';
    let a = string.match(/[\d\$\%]/g); //создаем масив из чисел и специальных символов
    let index:number[] = [];

    //создаем масив из индексов чисел, которые есть в массиве
    for (let i in a) {
        index.push(string.indexOf(a[i]));
    }
    //Переворачиваем всю строку
    for (let i = string.length - 1; i >= 0; i--) {
        returnStr += string[i];
    }
    //Удаляем все числа из строки
    returnStr = returnStr.replace(/\d/g, '');

    //Вставляем числа в строку по соответсвуюущему индексу
    for (let i in index) {
        returnStr = returnStr.slice(0, index[i]) + a[i] + returnStr.slice(index[i]);
    }
    return returnStr;
}
console.log('reverce = ', reverse('s1ta8r3t'));
