
type menuItem = {title:string, items?:menuItem[]}
type menuList = {title:string, items:menuItem[]}[]

let menuList:menuList = [
    {title: 'Животные', items: [
        {title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]},
        {title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ]},
    ]},
    {title: 'Рыбы', items: [
        {title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]},
        {title: 'Форель', items: [
            {title: 'Морская форель'}
        ]},
    ]}
];

function generateMenu(list:menuList):string {
    let str:string = '';
    for (let menu of list) {
        str += generateItem(menu);
    }
    return `<ul>${str}</ul>`;
}

function generateItem(item:menuItem):string {
    let itemClass:string = "last-item";
    let str:string = "";
    if (item.items && item.items.length) {
        str += `<ul>`;
        for (let subItem of item.items) {
            str += generateItem(subItem);
        }
        str += `</ul>`;
        itemClass = "title";
    }

    return `<li><a class="${itemClass}">${item.title}</a>${str}</li>`;
}


let navMenuList:HTMLElement = document.querySelector('.menu') as HTMLElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (e:MouseEvent)=> {
    let el = e.target as HTMLElement;
    let classList = el.classList;
    if (classList.contains('title')) {
        let parentLi = el.parentNode as HTMLElement;
        parentLi.classList.toggle('menu-open')
    }
    if (classList.contains('last-item')) {
        let lastSelected:HTMLElement = document.querySelector('.last-item.selected') as HTMLElement;
        if(lastSelected !== null) {
            lastSelected.classList.remove('selected');
        }
        el.classList.toggle('selected');
    }
};