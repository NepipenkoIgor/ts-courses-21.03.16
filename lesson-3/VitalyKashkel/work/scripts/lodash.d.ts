interface Lodash {
	debounce<T extends Function>(func: T, wait?: number, options?: any): T;
}


declare module "lodash" {
	export = _;
}

declare var _: Lodash;