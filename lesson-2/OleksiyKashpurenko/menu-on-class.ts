/**
 * Created by igor on 1/10/16.
 *  5) Улучшите класс с менюшкой добавив публичные методы
 * getElem -возвращает елемент в котором генерится меню;
 * toggle открыть/закрыть элемент меню по метке;
 * close закрыть элемент меню по метке;
 * open открыть элемент меню по метке
 */


type menuItem = { title: string, link?: string, items?: menuItem[]};

let listOfMenu: Array<menuItem> = [
  {
    title: 'Животные', items: [
    {
      title: 'Млекопитающие', items: [
      {title: 'Коровы'},
      {title: 'Ослы'},
      {title: 'Собаки'},
      {title: 'Тигры'}
    ]
    },
    {
      title: 'Другие', items: [
      {title: 'Змеи'},
      {title: 'Птицы'},
      {title: 'Ящерицы'},
    ],
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

/***почему не описать интерфейс?*/

class MenuComponent {
  public targetElem: HTMLElement = null;

  constructor(protected menuList:menuItem[]) {}

  private _generate(items:menuItem[]):string {
    let str:string = `<ul>`;
    for (let item of items) {
      let subMenu = '';
      let itemClass:string = "last-item";
      if (item.items && item.items.length) {
        itemClass = "parent-item";
        subMenu = this._generate(item.items);
      }
      str += `<li><a class="${itemClass}">${item.title}</a>${subMenu}</li>`;
    }
    return `${str}</ul>`;
  }

  private _addEvents(el: HTMLElement):void {
    el.onclick = (e:MouseEvent):void => {
      let el = e.target as HTMLElement;
      let classList = el.classList;
      if (classList.contains('parent-item')) {
        let parentLi = el.parentNode as HTMLElement;
        parentLi.classList.toggle('menu-open')
      }
      if (classList.contains('last-item')) {
        let lastSelected:HTMLElement = document.querySelector('.last-item.selected') as HTMLElement;
        if(lastSelected !== null) {
          lastSelected.classList.remove('selected');
        }
        el.classList.add('selected');
      }
    };
  }

  public build(el: HTMLElement):void {
    this.targetElem = el;
    el.innerHTML = this._generate(this.menuList);
    this._addEvents(el);

  }

  // getElem -возвращает елемент в котором генерится меню;
  public getElem():HTMLElement {
    return this.targetElem;
  }

  private _serchLink(searchText:string):HTMLElement {
    let aTags = this.targetElem.getElementsByTagName("a");
    for (var i = 0; i < aTags.length; i++) {
      if (aTags[i].textContent == searchText) {
        return aTags[i];
      }
    }
    return null;
  }

  // toggle открыть/закрыть элемент меню по метке;
  public toggle(searchText:string):boolean {
    let li:HTMLElement = this._serchLink(searchText);
    if (li) {
      let parentLi = li.parentNode as HTMLElement;
      parentLi.classList.toggle('menu-open');
      return true;
    }
    return false;
  }

  // close закрыть элемент меню по метке;
  public close(searchText:string):boolean {
    console.log('close');
    let li:HTMLElement = this._serchLink(searchText);
    if (li) {
      let parentLi = li.parentNode as HTMLElement;
      parentLi.classList.remove('menu-open');
      return true;
    }
    return false;
  }
  // open открыть элемент меню по метке
  public open(searchText:string):boolean {
    let li:HTMLElement = this._serchLink(searchText);
    if (li) {
      let parentLi = li.parentNode as HTMLElement;
      parentLi.classList.add('menu-open');
      return true;
    }
    return false;
  }

}

let navMenuList:HTMLElement = document.querySelector('.menu') as HTMLElement;
let myMenu = new MenuComponent(listOfMenu);
myMenu.build(navMenuList);

let buttonToggle:HTMLElement = document.querySelector('.button-toggle') as HTMLElement;
buttonToggle.onclick = (e:MouseEvent)=> {
  let el = e.target as HTMLElement;
  myMenu.toggle(el.value);
};
let buttonClose:HTMLElement = document.querySelector('.button-close') as HTMLElement;
buttonClose.onclick = (e:MouseEvent)=> {
  let el = e.target as HTMLElement;
  myMenu.close(el.value);
};
let buttonOpen:HTMLElement = document.querySelector('.button-open') as HTMLElement;
buttonOpen.onclick = (e:MouseEvent)=> {
  let el = e.target as HTMLElement;
  myMenu.open(el.value);
};
