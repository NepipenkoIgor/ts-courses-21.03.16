

type bigList = {title: string, items? : bigList}[];

let menu: bigList = [
  {
    title: 'Животные', items: [
    {
      title: 'Млекопитающие', items: [
      {title: 'Коровы',},
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




function generateMenu(list: bigList):string{
  //let str = `<ul>`;
  let str = '';
  for (let menu of list) {
    str += `<li><a class="title">${menu.title}</a>`;
    str += `<ul>`;
    for (let item of menu.items) {
      if(!item.items){
        str += `<li><a>${item.title}</a></li>`
      }else{
        str += generateMenu([item])
      }
    }
    str += `</li></ul>`

  }
  //str += `</ul>`;
  return str;
}

let navMenuList:HTMLElement = document.querySelector('.menu ul') as HTMLElement;
navMenuList.innerHTML = generateMenu(menu);
navMenuList.onclick = (e:MouseEvent)=> {
  let el = e.target as HTMLElement;
  let classList = el.classList;
  if (classList.contains('title')) {
    let parentLi = el.parentNode as HTMLElement;
    parentLi.classList.toggle('menu-open')
  }
};


