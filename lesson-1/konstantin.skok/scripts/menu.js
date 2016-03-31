var menu = [
    {
        title: 'Животные', items: [
            {
                title: 'Млекопитающие', items: [
                    { title: 'Коровы', },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие', items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ],
            },
        ]
    },
    {
        title: 'Рыбы', items: [
            {
                title: 'Аквариумные', items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель', items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    }
];
function generateMenu(list) {
    /** почему убрал?*/
    //let str = `<ul>`;
    var str = '';
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var menu_1 = list_1[_i];
        str += "<li><a class=\"title\">" + menu_1.title + "</a>";
        str += "<ul>";
        for (var _a = 0, _b = menu_1.items; _a < _b.length; _a++) {
            var item = _b[_a];
            if (!item.items) {
                str += "<li><a>" + item.title + "</a></li>";
            }
            else {
                str += generateMenu([item]);
            }
        }
        str += "</li></ul>";
    }
    //str += `</ul>`;
    return str;
}
var navMenuList = document.querySelector('.menu ul');
navMenuList.innerHTML = generateMenu(menu);
navMenuList.onclick = function (e) {
    var el = e.target;
    var classList = el.classList;
    if (classList.contains('title')) {
        var parentLi = el.parentNode;
        parentLi.classList.toggle('menu-open');
    }
};
