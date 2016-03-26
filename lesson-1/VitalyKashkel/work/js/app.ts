interface MenuItem {
	title: string;
	items?: MenuItem[];
}

let menu: MenuItem[] = [
	{ title: 'Животные', items: [
		{ title: 'Млекопитающие', items: [
			{title: 'Коровы'},
			{title: 'Ослы'},
			{title: 'Собаки', items: [
				{title: "Таксы"},
				{title: "Овчарки"}
			]},
			{title: 'Тигры'}
		]	},
		{ title: 'Другие', items: [
			{title: 'Змеи'},
			{title: 'Птицы'},
			{title: 'Ящерицы'},
		]},
	]},
	{ title: 'Рыбы', items: [
		{	title: 'Аквариумные', items: [
			{title: 'Гуппи'},
			{title: 'Скалярии'}
		]	},
		{ title: 'Форель', items: [
			{title: 'Морская форель'}
		]	},
	]}
];


function generateMenu(menu: MenuItem[]): string {
	let menuTree = `<ul>`;
	for (let branch of menu) {
		menuTree += ("items" in branch) ? `<li><a class="title">${branch.title}</a>` : `<li><a>${branch.title}</a>`;
		if ("items" in branch) {
			let subMenu: MenuItem[] = branch.items;
			menuTree += generateMenu(subMenu);
			menuTree += `</li>`;
		}
	}
	menuTree += `</ul>`;

	return menuTree;
}

function createMenu(): void {
	let navMenuElement: HTMLElement = <HTMLElement>document.querySelector("nav");
	navMenuElement.innerHTML = generateMenu(menu);

	navMenuElement.onclick = (ev: MouseEvent)=> {
		let el = ev.target as HTMLElement;
		let classList = el.classList;
		if (classList.contains('title')) {
			let parentLi = el.parentNode as HTMLElement;
			parentLi.classList.toggle("menu-open");
		}
	};
	
}

document.addEventListener("DOMContentLoaded", createMenu);
