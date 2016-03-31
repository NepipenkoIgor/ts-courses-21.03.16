let menuArr:MenuItem[] = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {
                        title: 'Коровы',
                    },
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
    },
    {
        title: 'Другое (проверка на пустое "items")',
        items: []
    }
];



interface MenuItem {
    title:string,
    items?:MenuItem[]
}

class Menu {
    protected menuArr:any[];
    protected menuElement:HTMLElement;

    constructor(elementId:string, menuArr:MenuItem[]) {
        let mainMenu:HTMLElement = document.getElementById(elementId) as HTMLElement;
        if (!mainMenu) {
            throw new Error("Can't find element by ID #" + elementId);
        }
        mainMenu.innerHTML = this._genMenu(menuArr);
        this.menuElement = mainMenu;
        this._addClick();
    }

    protected _genMenu(menu:MenuItem[]):string {
        let _self = this;
        let result:string = "";

        menu.map((menuItem) => {
            if ("items" in menuItem) {
                let subMenu:string = "";
                subMenu += _self._genMenu(menuItem.items);
                result += `<li><a href="javascript:void(0);" class="title">${menuItem.title}</a>${subMenu}</li>`;
            } else {
                result += `<li><a href="#">${menuItem.title}</a></li>`;
            }
        });

        return `<ul>${result}</ul>`;
    }

    public getElem():HTMLElement {
        return this.menuElement;
    }

    protected _addClick():void {
        //add click on menuItem
        this.menuElement.addEventListener("click", (event:MouseEvent) => {
            let element = event.target as HTMLElement;
            if (element.classList.contains('title')) {
                let parentElement = element.parentNode as HTMLElement;
                parentElement.classList.toggle('menu-open');
            }
        });
    }

    public toggle(item:string):void {
        let element = this._searchText(item);

        if (element && element.classList.contains('title')) {
            let parentElement = element.parentNode as HTMLElement;
            parentElement.classList.toggle('menu-open');
        }
    }

    public open(item:string):void {
        let element = this._searchText(item);

        if (element && element.classList.contains('title')) {
            let parentElement = element.parentNode as HTMLElement;
            parentElement.className = 'menu-open';
        }
    }

    public close(item:string):void {
        let element = this._searchText(item);

        if (element && element.classList.contains('title')) {
            let parentElement = element.parentNode as HTMLElement;
            parentElement.className = '';
        }
    }

    protected _searchText(str:string):HTMLElement {
        let items = this.menuElement.getElementsByTagName("a");
        for (let i = 0; i < items.length; i++) {
            if (items[i].textContent === str) {
                return items[i];
            }
        }
        return null;
    }
}


let menu = new Menu("main-menu", menuArr);

console.log(menu.getElem());

setTimeout(()=> { menu.toggle('Рыбы'); }, 1200);
setTimeout(()=> { menu.toggle('Форель'); }, 2000);

setTimeout(()=> { menu.open('Млекопитающие'); }, 1200);
setTimeout(()=> { menu.open('Животные'); }, 700);

setTimeout(()=> { menu.close('Рыбы'); }, 3000);
