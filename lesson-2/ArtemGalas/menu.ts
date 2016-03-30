type menuType = {title: string, items?: menuType}[];

class Menu {
  protected element:string;
  protected menu:menuType;

  constructor(element:string, menu:menuType) {
    this.element = element;
    this.menu = menu;
    let el:HTMLElement = document.querySelector(this.element) as HTMLElement;
    el.innerHTML = this.generateMenu(menu);
    el.addEventListener('click', this.onClickHandler);
  }

  protected generateMenu(list:menuType):string {
    let template:string = `<ul>`;
    for (let menu of list) {
      template += `<li><a class="title">${menu.title}</a>`;
      if (menu.items) {
        template += this.generateMenu(menu.items);
      }
      template += `</li>`;
    }
    template += `</ul>`;
    return template;
  }

  protected onClickHandler(event:MouseEvent):void {
    let el = event.target as HTMLElement;
    let classList = el.classList;
    if (classList.contains('title')) {
      let parentLi = el.parentNode as HTMLElement;
      parentLi.classList.toggle('menu-open');
    }
  }

  public findElByContent(textContent:string):HTMLElement|string {
    let elements = document.querySelectorAll('a.title');
    for (let i in elements) {
      let element = elements[i] as HTMLElement;
      if (element.textContent === textContent) {
        return element
      }
      else {
        return `Don't find anything`
      }
    }
  }

  public openHandler(element:string):string {
    let el:HTMLElement = this.findElByContent(element) as HTMLElement;
    el.className = 'menu-open';
    return ''
  }
}

const menuList:menuType = [
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

let menu = new Menu('.menu', menuList);

//Testing Find Element
setTimeout(function(){
  console.log (menu.findElByContent('Животные'));
},100);

let el = document.querySelector('.button-open') as HTMLButtonElement;
console.log (el);
el.onclick = function bla() {
  console.log ('aaa');
}