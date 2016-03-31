/**
 * Created by igor on 3/23/16.
 */
var say = 'a bird < two cat';
var html = (_a = ["<div> hellow ", "</div>"], _a.raw = ["<div> hellow ", "</div>"], htmlEscape(_a, say));
function htmlEscape(literals) {
    var placeholders = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        placeholders[_i - 1] = arguments[_i];
    }
    var result = '';
    for (var i = 0; i < placeholders.length; i++) {
        result += literals[i];
        /** была обидная описка regExp написали строкой*/
        result += placeholders[i]
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt');
    }
    result += literals[literals.length - 1];
    return result;
}
console.log(html);
var foo = { bar: 123, bas: 456 };
foo.bar = 456; // не может поменять свойство
var pt = { x: 4, y: 5 };
pt.x = 5; // не может поменять свойство
/**Function**/
function fooF(config) {
    var bar = config.bar;
    config.bar = 45;
}
var config = { bar: 123, bas: 123 };
fooF(config);
var _a;
