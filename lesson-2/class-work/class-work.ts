/**
 * Created by igor on 3/28/16.
 */
// let getAverage = (...a:number[]):string => {
//     let total = 0;
//     let count = 0;
//     for (let i = 0; i < a.length; i++) {
//         total += a[i];
//         count++;
//     }
//     let average = total / count;
//     return `The average is ${average}`;
// }
//
// console.log(getAverage(4, 3,45,3,0,-4,5));

//
// function getAverage(a: string, b:string, c:string):string;
// function getAverage(a: number, b:number, c:number):string;
// function getAverage(a: any, b:any, c:any):string {
//     let total = parseInt(a, 10) + parseInt(b, 10) + parseInt(c, 10);
//     let average = total / 3;
//     return `The average is ${average}`;
// }
//
// console.log(getAverage('4', '3', '45'));


// function getHandler(behavior:'Random'): typeof RandomHandler;
// function getHandler(behavior:'Reversed'): typeof ReversedHandler;
// function getHandler(behavior:string): typeof Handler;
// function getHandler(behavior:string): typeof Handler {
//     switch (behavior) {
//         case 'Random':
//             return new RandomHandler();
//         case 'Reversed':
//             return new ReversedHandler();
//         default:
//             return new Handler();
//
//     }
// }
// function RandomHandler() {
// }
// function ReversedHandler() {
// }
// function Handler() {
// }
    

// abstract class Info {
//     abstract getInfo():string;
// }
//
//
// class Account extends Info {
//     constructor(public firstName:string, public income:number) {
//
//     }
//
//     getInfo():string {
//         return this.firstName
//     }
//
//     get accauntName() {
//         return this.firstName;
//     }
//
//
//     set accauntName(name:string) {
//         this.firstName = name;
//     }
// }
//
// let acc = new Account('Igor', 12);
// console.log(acc.accauntName)
// acc.accauntName = 'Vova'