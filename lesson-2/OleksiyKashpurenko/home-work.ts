// 1)
//   Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
//   Возвращает true, если все аргументы, кроме первого входят в первый.
//   Первым всегда должен быть массив.

/**Почему только строки ?? */
let isInArray = (b:string[], ...a:string[]):boolean => {
  let count:number = a.length;
  for (let i = 0; i < count; i++) {
    if (b.indexOf(a[i]) === -1) {
      return false;
    }
  }
  return true;
};
console.log('function isInArray return: ', isInArray(['1','2','3'],'1','2','1','3','2'));

// 2)
// писать функцию summator(), которая сумирует переданые ей аргументы.
// Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено

/**как же isNaN*/
type S = number|string;
let summator = (...source:S[]):number => {
  let sum:number = 0;
  for(let i in source ) {
    if (typeof source[i] === "string"){
      sum += parseFloat(<string> source[i]);
    }
    else {
      sum += <number> source[i];
    }
  }
  return sum;
};
// сделал именно так чтоб можно было передавать значения в перемешку
console.log('summator("1.1", "2", 3) => ' + summator('1.1', '2', 3).toString());


// 3)
// Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
//   и возвращает массив уникальных элементов. Аргумент не должен изменяться.
//   Порядок элементов результирующего массива должен совпадать с порядком,
//   в котором они встречаются в оригинальной структуре.
//   Специально обрабатывать значение NaN не обязательно.
function getUnique<T>(...source:T[]):Array<T> {
  let result:T[] = [];

  /**
   * почему in а не оf???
   * */

  for(let i in source ) {
    if(result.indexOf(source[i])==-1) {
      result.push(source[i]);
    }
  }
  return result;
}
console.log(getUnique(1,2,2,1,3,4,4,4,5));
// console.log(getUnique("A",0,5,7,"A")); // ругается компилятор ! тест с ошибочными данными



// 4)
// Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
// цифры и специальные символы должны остаться на месте
// s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
// s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
// s1tar3t 2   low5  ->  t1rat3s 2   wol5
let rollLetters = (source:string):string => {

  let chunks:string[] = source.split(' ');
  for(let c in chunks ) {
    let letters: string = '';
    for(let i = 0; i < chunks[c].length; i++ ) {
      if(/[a-zA-Z]/.test(chunks[c][i])) {
        letters = chunks[c][i] + letters;
      }
    }

    let counter = 0;
    let tmp = '';
    for(let i = 0; i < chunks[c].length; i++ ) {
      if(/[a-zA-Z]/.test(chunks[c][i])) {
        tmp += letters[counter++];
      }
      else {
        tmp += chunks[c][i];
      }
    }
    chunks[c] = tmp;
  }

  return chunks.join(' ');
};
console.log('s1tar3t 2 hellow', ' -> ', rollLetters('s1tar3t 2 hellow'));
console.log('s1ta$%r3t 2 hel^low', ' -> ', rollLetters('s1ta$%r3t 2 hel^low'));
console.log('s1tar3t 2   low5', ' -> ', rollLetters('s1tar3t 2   low5'));

// 5) Улучшите класс с менюшкой добавив публичные методы
// getElem -возвращает елемент в котором генерится меню;
// toggle открыть/закрыть элемент меню по метке;
// close закрыть элемент меню по метке;
// open открыть элемент меню по метке