var menuList = [
    {
        title: 'Животные', items: [
            {
                title: 'Млекопитающие', items: [
                    { title: 'Коровы' },
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
    var template = "<ul>";
    for (var _i = 0; _i < list.length; _i++) {
        var menu = list[_i];
        template += "<li><a class=\"title\">" + menu.title + "</a>";
        if (menu.items) {
            template += generateMenu(menu.items);
        }
        template += "</li>";
    }
    template += "</ul>";
    return template;
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
