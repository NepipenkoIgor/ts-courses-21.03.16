var menu = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие',
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ],
            },
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель',
                items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    },
    {
        title: 'Другое (проверка на пустое "items")',
        items: []
    }
];
initMenu(menu);
function initMenu(menu) {
    var menuStr = "";
    menuStr += generateMenu(menu);
    var mainMenu = document.getElementById('main-menu');
    mainMenu.innerHTML = menuStr;
    //add click on menuItem
    mainMenu.addEventListener("click", function (event) {
        var element = event.target;
        if (element.classList.contains('title')) {
            var parentElement = element.parentNode;
            parentElement.classList.toggle('menu-open');
        }
    });
}
function generateMenu(menu) {
    var result = "";
    menu.map(function (menuItem) {
        if ("items" in menuItem) {
            var subMenu = "";
            subMenu += generateMenu(menuItem.items);
            result += "<li><a href=\"javascript:void(0);\" class=\"title\">" + menuItem.title + "</a>" + subMenu + "</li>";
        }
        else {
            result += "<li><a href=\"#\">" + menuItem.title + "</a></li>";
        }
    });
    return "<ul>" + result + "</ul>";
}
