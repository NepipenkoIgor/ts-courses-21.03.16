type menuType = {title:string, items?:menuType}[];

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

function generateMenu(list:menuType):string {
  let template:string = `<ul>`;
  for (let menu of list) {
    template +=`<li><a class="title">${menu.title}</a>`;
    if (menu.items) {
      template += generateMenu(menu.items);
    }
    template += `</li>`
  }
  template += `</ul>`;
  return template
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
