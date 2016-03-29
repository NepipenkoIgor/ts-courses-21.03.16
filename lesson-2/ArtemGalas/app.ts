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