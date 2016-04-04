interface MenuItem {
    title:string;
    label?:boolean;
    items?:MenuItem[];
}

let menu:MenuItem[] = [
    {
        title: 'Животные', label: true, items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {
                title: 'Собаки', items: [
                {title: 'Таксы'},
                {title: 'Овчарки'}
            ]
            },
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ]
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
        },
        {
            title: 'Форель', items: [
            {title: 'Морская форель'}
        ]
        },
    ]
    }
];

interface myMenu {
    createMenu():void;
    getElem():HTMLElement;
    open():void;
    close():void;
    toggle():void;
}

class Menu implements myMenu {
    constructor(private mainMenu:MenuItem[]) {
    }

    private labelTitle:string = "";

    private generateMenu(menu):string {
        let menuTree = `<ul>`;
        for (let branch of menu) {
            menuTree += ('items' in branch) ? (("label" in branch) ? `<li><a class="title" id="label">${branch.title}</a>` : `<li><a class="title">${branch.title}</a>`) : `<li><a>${branch.title}</a></li>`;
            if ('items' in branch) {
                this.labelTitle = ("label" in branch) ? branch.title : this.labelTitle;
                let subMenu:MenuItem[] = branch.items;
                menuTree += this.generateMenu(subMenu);
                menuTree += `</li>`;
            }
        }
        menuTree += `</ul>`;

        return menuTree;
    }

    createMenu():void {
        let navMenuElement:HTMLElement = <HTMLElement>document.querySelector('.menu');
        navMenuElement.innerHTML = this.generateMenu(this.mainMenu);
        let butToggle:HTMLElement = <HTMLElement>document.querySelector("#toggle");
        butToggle.innerHTML = `TOGGLE ${this.labelTitle}`;
        let butOpen:HTMLElement = <HTMLElement>document.querySelector("#open");
        butOpen.innerHTML = `OPEN ${this.labelTitle}`;
        let butClose:HTMLElement = <HTMLElement>document.querySelector("#close");
        butClose.innerHTML = `CLOSE ${this.labelTitle}`;
        navMenuElement.onclick = (ev:MouseEvent) => {
            let el = ev.target as HTMLElement;
            let classList = el.classList;
            if (classList.contains('title')) {
                let parentLi = <HTMLElement>el.parentNode;
                parentLi.classList.toggle('menu-open');
            }
        };
    }

    getElem():HTMLElement {
        let navMenuElement:HTMLElement = <HTMLElement>document.querySelector('.menu');
        return navMenuElement;
    }

    open():void {
        let elLabel = <HTMLElement>document.querySelector("#label");
        let parentLi = <HTMLElement>elLabel.parentNode;
        parentLi.classList.add('menu-open');
    }

    close():void {
        let elLabel = <HTMLElement>document.querySelector("#label");
        let parentLi = <HTMLElement>elLabel.parentNode;
        parentLi.classList.remove('menu-open');
    }

    toggle():void {
        let elLabel = <HTMLElement>document.querySelector("#label");
        let parentLi = <HTMLElement>elLabel.parentNode;
        parentLi.classList.toggle('menu-open');
    }

}


document.addEventListener('DOMContentLoaded', function () {
    let myMenu = new Menu(menu);
    myMenu.createMenu();

    console.log(myMenu.getElem());

    let butToggle:HTMLElement = <HTMLElement>document.querySelector("#toggle");
    butToggle.addEventListener("click", myMenu.toggle, false);
    let butOpen:HTMLElement = <HTMLElement>document.querySelector("#open");
    butOpen.addEventListener("click", myMenu.open, false);
    let butClose:HTMLElement = <HTMLElement>document.querySelector("#close");
    butClose.addEventListener("click", myMenu.close, false);
});
