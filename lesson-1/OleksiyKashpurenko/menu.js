var menuList = [
    { title: 'Животные', items: [
            { title: 'Млекопитающие', items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ] },
            { title: 'Другие', items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ] },
        ] },
    { title: 'Рыбы', items: [
            { title: 'Аквариумные', items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ] },
            { title: 'Форель', items: [
                    { title: 'Морская форель' }
                ] },
        ] }
];
function generateMenu(list) {
    var str = '';
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var menu = list_1[_i];
        str += generateItem(menu);
    }
    return "<ul>" + str + "</ul>";
}
function generateItem(item) {
    var itemClass = "last-item";
    var str = "";
    if (item.items && item.items.length) {
        str += "<ul>";
        for (var _i = 0, _a = item.items; _i < _a.length; _i++) {
            var subItem = _a[_i];
            str += generateItem(subItem);
        }
        str += "</ul>";
        itemClass = "title";
    }
    return "<li><a class=\"" + itemClass + "\">" + item.title + "</a>" + str + "</li>";
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
    if (classList.contains('last-item')) {
        var lastSelected = document.querySelector('.last-item.selected');
        if (lastSelected !== null) {
            lastSelected.classList.remove('selected');
        }
        el.classList.toggle('selected');
    }
};
