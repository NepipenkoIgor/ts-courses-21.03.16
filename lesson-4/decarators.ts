/**
 * Created by igor on 4/4/16.
 */

/* декоратор метода*/

class MathLib {
    @logMethod('log my method')
    public areaOfCircle(r:number):number {
        return Math.PI * r ** 2;
    }
}

function logMethod(msg):any {
    return (target:any, key:string, descriptor:any):any=> {
        console.log(target);
        console.log(key);
        console.log(descriptor);
        let originalDesc = descriptor.value;
        descriptor.value = function (...args:any[]):any {
            let b = args.map((a:any)=>JSON.stringify(a)).join();
            let result = originalDesc.apply(this, args);
            let r = JSON.stringify(result);
            console.log(`${msg} =>Call: ${key}(${b})=>${r}`);
            return result;
        }
        return descriptor;
    }
}

let a = new MathLib();
a.areaOfCircle(3);


/* декоратор свойства*/

// class Account {
//     @logProperty
//     public firstName:string;
//     public lastName:string;
//
//     constructor(firstName:string, lastName:string) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
// }
// function logProperty(target:any, key:string):void {
//     let _val = target[key];
//
//     let getter = function ():typeof _val {
//         console.log(`Get: ${key} => ${_val}`);
//         return _val;
//     };
//
//     let setter = function (newVal:any):void {
//         console.log(`Set: ${key} => ${newVal}`);
//         _val = newVal;
//     };
//     Object.defineProperty(target, key, {
//         get: getter,
//         set: setter,
//         enumerable: true,
//         configurable: true
//     });
// }
//
// let me = new Account('Igor', 'Nepipenko');
// me.firstName = 'Vova';

/* декоратор класса*/
// @logClass
// class Person {
//     public name:string;
//     public surname:string;
//
//     constructor(name:string, surname:string) {
//         this.name = name;
//         this.surname = surname;
//     }
// }
// function logClass(target:any):any {
//     return () => {
//         console.log(`New instance of ${target.name}`);
//         return target;
//     }
// }
//
// let firstPerson = new Person('Igor', 'Nepipenko');
// let secondPerson = new Person('Vova', 'Loban');

/* декоратор параметра*/

// class PersonAccount {
//     public name:string;
//     public surname:string;
//
//     constructor(name:string, surname:string) {
//         this.name = name;
//         this.surname = surname;
//     }
//
//     @readMetaData
//     public sayMessage(@logParameter msg:string):string {
//         return `${this.name} ${this.surname} : ${msg}`;
//     }
// }
// function logParameter(target:any, key:string, index:number):void {
//     let metadataKey = `___log_${key}_parameters`;
//     if (Array.isArray(target[metadataKey])) {
//         target[metadataKey].push(index);
//     } else {
//         target[metadataKey] = [index];
//     }
// }
// function readMetaData(target:any, key:string, descriptor:any):any {
//     let metadataKey = `___log_${key}_parameters`;
//     let indices = target[metadataKey];
//     let originalDesc = descriptor.value;
//     descriptor.value = function (...args:any[]):any {
//         console.log(`${key} arg[${indices}] : ${args[indices]}`);
//         return originalDesc.apply(this, args);
//     };
//     return descriptor;
// }
//
// let person = new PersonAccount('Igor', 'Nepipenko');
// person.sayMessage('decorators is good');
// person.sayMessage('decorators is good and go Angular2');

// namespace Shipping {
//     export interface Ship {
//         name:string;
//         port:string;
//         income:number
//     }
//
//     export class Ferry implements Ship {
//         constructor(public name:string,
//                     public port:string,
//                     public income:number) {
//         }
//     }
// }
//
// let b:Shipping.Ship;
// let a= new Shipping.Ferry('ship','france',20);
//
// namespace Docking{
//     import Ship=Shipping.Ship;
//    
// }