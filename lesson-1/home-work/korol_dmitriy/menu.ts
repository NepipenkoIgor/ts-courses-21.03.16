let menu: Array<MenuItem> = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {title: 'Коровы'},
                    {title: 'Ослы'},
                    {title: 'Собаки'},
                    {title: 'Тигры'}
                ]
            },
            {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'},
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
                    {title: 'Гуппи'},
                    {title: 'Скалярии'}
                ]
            },
            {
                title: 'Форель',
                items: [
                    {title: 'Морская форель'}
                ]
            },
        ]
    }
];

initMenu(menu);


interface MenuItem {
    title: string,
    items?: Array<MenuItem>
}

function initMenu (menu: Array<MenuItem>):void {
    let menuStr = "";
    menuStr += generateMenu(menu);

    let mainMenu:HTMLElement = document.getElementById('main-menu');
    mainMenu.innerHTML = menuStr;

    //add click on menuItem
    mainMenu.addEventListener("click", (event:MouseEvent) => {
        let element = event.target as HTMLElement;
        if(element.classList.contains('title')) {
            let parentElement = element.parentNode as HTMLElement;
            parentElement.classList.toggle('menu-open');
        }
    });
}

function generateMenu(menu: Array<MenuItem>):string {
    let result:string = "";
    menu.map((menuItem)=>{
        if(Array.isArray(menuItem.items)) {
            let subMenu:string = "";
            subMenu += generateMenu(menuItem.items);
            result += `<li><a href="javascript:void(0);" class="title">${menuItem.title}</a>${subMenu}</li>`;
        } else {
            result += `<li><a href="#">${menuItem.title}</a></li>`;
        }
    });
    return `<ul>${result}</ul>`;
}