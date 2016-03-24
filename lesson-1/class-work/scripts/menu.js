var menuList = [
    { title: 'Животные', items: ['Кошки', 'Собаки'] },
    { title: 'Рыбы', items: ['Акула', 'Клоун'] }
];
function generateMenu(list) {
    var str = "<ul>";
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var menu = list_1[_i];
        str += "<li><a class=\"title\">" + menu.title + "</a>";
        str += "<ul>";
        for (var _a = 0, _b = menu.items; _a < _b.length; _a++) {
            var item = _b[_a];
            str += "<li><a>" + item + "</a></li>";
        }
        str += "</li></ul>";
    }
    str += "</ul>";
    return str;
}
var navMenuList = document.querySelector('.menu');
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = function (e) {
    var el = e.target;
    var classList = el.classList;
    if (classList.contains('title')) {
        var parentLi = el.parentNode;
        parentLi.classList.toggle('menu-open');
    }
};
