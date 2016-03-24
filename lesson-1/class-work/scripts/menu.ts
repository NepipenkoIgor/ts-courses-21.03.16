type menuList ={title:string,items:string[]}[]

let menuList:menuList = [
    {title: 'Животные', items: ['Кошки', 'Собаки']},
    {title: 'Рыбы', items: ['Акула', 'Клоун']}
]

function generateMenu(list:menuList):string {
    let str:string = `<ul>`;
    for (let menu of list) {
        str += `<li><a class="title">${menu.title}</a>`;
        str += `<ul>`;
        for (let item of menu.items) {
            str += `<li><a>${item}</a></li>`
        }
        str += `</li></ul>`
    }
    str += `</ul>`;
    return str;
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
};