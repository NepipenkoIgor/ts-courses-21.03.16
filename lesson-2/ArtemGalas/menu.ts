type menuType = {title: string, items?: menuType}[];


/*** Хотелось бы увидеть интерфейс или абстрактный класс**/

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

  public open(content:string):void {
    let el:HTMLElement = this.findElByContent(content) as HTMLElement;
    let parentLi = el.parentNode as HTMLElement;
    parentLi.classList.add('menu-open');
  }

  public close(content:string):void {
    let el:HTMLElement = this.findElByContent(content) as HTMLElement;
    let parentLi = el.parentNode as HTMLElement;
    parentLi.classList.remove('menu-open');
  }

  public toggle(content:string):void {
    let el:HTMLElement = this.findElByContent(content) as HTMLElement;
    let parentLi = el.parentNode as HTMLElement;
    parentLi.classList.toggle('menu-open');
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

let buttonOpen = document.querySelector('.button-open') as HTMLButtonElement;
let buttonClose = document.querySelector('.button-close') as HTMLButtonElement;
let buttonToggle = document.querySelector('.button-toggle') as HTMLButtonElement;

buttonOpen.onclick = function open() {
  menu.open('Животные');
};
buttonClose.onclick = function close() {
  menu.close('Животные');
};
buttonToggle.onclick = function toggle() {
  menu.toggle('Животные');
};

type ElementCoordinates = {top:number, left:number}

class Slider {

  protected element:HTMLElement;
  protected thumb:HTMLElement;
  protected sliderCoords:ElementCoordinates;
  protected thumbCoords:ElementCoordinates;
  protected shiftX:number;

  constructor(element:HTMLElement) {
    this.element = element as HTMLElement;
    this.thumb = this.element.children[0] as HTMLElement;
    this.thumb.addEventListener('mousedown', this.mouseDown);
  }

  /**!!! мы же говорили об этом на занятии !!! метод и свойство!!!!****/
  
  protected mouseDown = (event:MouseEvent):void => {
    this.sliderCoords = this.getCoordinate(this.element);
    this.thumbCoords = this.getCoordinate(this.thumb);
    this.shiftX = event.pageX - this.thumbCoords.left;
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  protected mouseMove = (event:MouseEvent):void => {
    let newLeft = event.pageX - this.shiftX - this.sliderCoords.left;
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = this.element.offsetWidth - this.thumb.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }
    this.thumb.style.left = newLeft + 'px';
  };

  protected mouseUp = ():void => {
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  };

  /**уходим от var**/
  protected getCoordinate(element:HTMLElement):ElementCoordinates {
    var box = element.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
}
let slider = document.getElementById('slider') as HTMLElement;
let sl = new Slider(slider);