/*
 Улучшите класс с менюшкой добавив публичные методы

 getElem возвращает елемент в котором генерится меню;
 toggle открыть/закрыть элемент меню по метке;
 close закрыть элемент меню по метке;
 open открыть элемент меню по метке

 в интерфейсе реализуйте кнопками вызов этих методов (например над меню)

 P.S. для демонстрации
 */
import { menuList } from './types';
import IMenuList from './IMenuList';

export default class MenuList implements IMenuList {
    protected parentElement: HTMLElement;
    protected elem: HTMLElement;

    protected isOpen: boolean = false;

    constructor(parentElement: HTMLElement, menuList: menuList) {
        this.parentElement = parentElement;
    
        this.elem = document.createElement('ul');
        
        for (let menuItem of menuList) {
            let item: HTMLElement = document.createElement('li');
            let title: HTMLElement = document.createElement('a');
            
            title.innerText = menuItem.title;
            item.appendChild(title);
            
            this.elem.appendChild(item);
            
            if (menuItem.items) {
                title.classList.add('title');

                let child: IMenuList = new MenuList(this.elem, menuItem.items);
                this.elem.appendChild(child.getElem());

                this.elem.addEventListener('onclick', this.toggle.bind(this.elem))
            }
        }
        
        this.parentElement.appendChild(this.elem)

    }

    public getElem(): HTMLElement {
        return this.elem;
    };

    public toggle() {
        this.elem.classList.toggle('menu-open')
    };

    public close() {
        this.elem.classList.remove('menu-open')
    };

    public open() {
        this.elem.classList.add('menu-open')
    };
}


//
//
// function generateMenu(list: menuList): string {
//     let str: string = `<ul>`;
//
//     for (let menu of list) {
//         if (menu.hasOwnProperty("items")) {
//             str += `<li><a class="title">${menu.title}</a>`;
//             str += generateMenu(menu.items);
//         } else {
//             str += `<li><a>${menu.title}</a>`;
//         }
//     }
//
//     str += `</ul>`;
//
//     return str;
// }
//
// let navMenuList: HTMLElement = document.querySelector('.menu') as HTMLElement;
//
// navMenuList.innerHTML = generateMenu(menuList);
//
// navMenuList.onclick = (e: MouseEvent) => {
//     let el = e.target as HTMLElement;
//     let classList = el.classList;
//
//     if (classList.contains('title')) {
//         let parentLi = el.parentNode as HTMLElement;
//         parentLi.classList.toggle('menu-open')
//     }
// };
