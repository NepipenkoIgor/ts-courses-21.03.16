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