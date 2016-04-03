import MenuList from './MenuList';
import { menuList } from './fixtures';

let menuNav: HTMLElement = document.querySelector("#menu") as HTMLElement;

new MenuList(menuNav, menuList);
