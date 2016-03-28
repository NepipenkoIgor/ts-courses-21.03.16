/**
 * Created by igor on 3/23/16.
 */

let say = 'a bird < two cat';
let html = htmlEscape`<div> hellow ${say}</div>`;


function htmlEscape(literals, ...placeholders) {
    let result = '';
    for (let i = 0; i < placeholders.length; i++) {
        result += literals[i];
        /** была обидная описка regExp написали строкой*/
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt');
    }
    result += literals[literals.length - 1];
    return result;
}

console.log(html)

/**
 *
 * В проекте стояла по-умолчанию версия TS 1.8.7 ( в настройках WebStrom)
 * это фича версии 2.x => поэтому компилятор не смог отработать корректно
 *
 * ставим -> npm i typescript@next -g ( или локально)
 * теперь версия например (на сегодня) => typescript@1.9.0-dev.20160324
 *
 * */


/**alias*/
type Foo = {
    readonly bar:number;
    readonly bas:number;
}

let foo:Foo = {bar: 123, bas: 456};
foo.bar = 456; // не может поменять свойство


/**interface */
interface ImmutablePoint {
    readonly x:number;
    readonly y:number;
}
var pt:ImmutablePoint = {x: 4, y: 5};
pt.x = 5; // не может поменять свойство


/**Function**/

function fooF(config:{
    readonly bar:number,
    readonly bas:number
}) {
    let bar = config.bar;
    config.bar = 45;
}

let config = {bar: 123, bas: 123};
fooF(config);