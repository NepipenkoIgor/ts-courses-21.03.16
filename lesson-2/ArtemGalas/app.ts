/* Worked only if one number equal in target */
//TODO
//function isInArray(target:number[], ...args:number[]):boolean {
//  for (let i in args) {
//    console.log(target.indexOf(args[i]));
//    if (target.indexOf(args[i]) === -1){
//      return false
//    }
//    else {
//      return true
//    }
//  }
//}
//console.log(isInArray([1, 2],3,2));

function sumator(...numbers:(string|number)[]):number {
  let numbersArray:number[] = [];
  let count:number = 0;
  for (let i in numbers) {
    let num = numbers[i];
    //count += (typeof num == 'string') ? parseInt(num) : num; //TypeScripту мало == получается, так как в этой строке ошибка
    count += (typeof num === 'string') ? parseInt(num) : num;
  }
  return count
}
console.log(sumator('3', '4', '6', 7, 8, 9));

let getUnique = (...numbers:number[]):number[] => {
  let returnedArray:number[] = [];
  for (let i = 0; i < numbers.length; i++) {
    if (returnedArray.indexOf(numbers[i]) === -1) {
      returnedArray.push(numbers[i]);
    }
  }
  return returnedArray;
};
console.log(getUnique(1, 4, 3, 2, 4, 3));

function reverse(string:string):string {
  let returnStr:string = '';
  let a = string.match(/[\d\$\%]/g); //создаем масив из чисел и специальных символов
  let index:number[] = [];

  console.log ('mas= ',a);

  //создаем масив из индексов чисел, которые есть в массиве
  for(let i in a) {
   index.push(string.indexOf(a[i]));
  }
  //Переворачиваем всю строку
  for (let i = string.length-1; i >= 0; i--) {
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
console.log(reverse('s1ta8r3t')); // -> 1metr3A
