/** uri: 'https://api.flickr.com/services/rest/?',
 queryMethod: 'flickr.photos.search',
 apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
 */

/// <reference path="../typings/q/Q.d.ts" />
/// <reference path="fetch.d.ts" />
/// <reference path="lodash.d.ts" />

type opt = {
    elem:HTMLElement;
    uri:string;
    queryMethod:string;
    apiKey:string
}

type photo =  {
    id:string;
    owner:string;
    secret:string;
    server:string;
    farm:number;
    title:string;
    ispublic:number;
    isfriend:number;
    isfamily:number;
}

type person = {
    can_buy_pro:number;
    description:any;
    has_stats:string;
    iconfarm:number;
    iconserver:string;
    id:string;
    ispro:number;
    mobileurl:any;
    nsid:string;
    path_alias:any;
    photos:any;
    photosurl:any;
    profileurl:any;
    username:{
        _content:string;
    };
}

type owner = {
    person:person;
    stat:string;
}

interface displayPerson {
    name:string
}

class FlickrApp {
    protected elem:HTMLElement;
    protected input:HTMLInputElement;
    protected searchButton:HTMLButtonElement;
    protected sortButton:HTMLButtonElement;
    protected imageBox:HTMLDivElement;
    protected waitImg:HTMLImageElement;
    protected uri:string;
    protected queryMethod:string;
    protected apiKey:string;
    protected photos:photo[];
    protected ownerNames:{[id:string]:displayPerson};
    protected sortDirectionUp:boolean;


    constructor(opt:opt) {
        let {elem, uri, queryMethod, apiKey}=opt;
        this.elem = elem;
        this.uri = uri;
        this.queryMethod = queryMethod;
        this.apiKey = apiKey;
        this.ownerNames = {};
        this.input = this.elem.querySelector('.flickr-search-input') as HTMLInputElement;
        this.imageBox = this.elem.querySelector('.image-area') as HTMLDivElement;
        this.waitImg = this.elem.querySelector('.wait') as HTMLImageElement;
        this.searchButton = this.elem.querySelector('.flickr-search-button') as HTMLButtonElement;
        this.sortButton = this.elem.querySelector('.flickr-sort') as HTMLButtonElement;
        this.searchButton.addEventListener('click', this.searchAndRender.bind(this));
        /* также будет работать и так, без bind */
        // this.searchButton.addEventListener('click', (): void => {
        // 	this.search()
        // 		.then((body: any) => {
        // 			this.render(body);
        // 		});
        // });
        this.sortButton.addEventListener('click', _.debounce(this.sortAndRender.bind(this)));
    }

    protected render(body:any):void {
        this.photos = body.photos.photo;
        let content = '';
        this.imageBox.innerHTML = content;
        for (let photo of this.photos) {
            let name = this.ownerNames[photo.owner].name;
            content += `<div  class='image-box'>
					<img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg' />
					<p><b>title: </b>${photo.title}</p>
					<p><b>owner: </b>${name}</p>
					</div>`;
        }
        this.imageBox.innerHTML = content;
    }

    protected search():PromiseLike<any> {
        if (!this.input.value) {
            return;
        }
        let text = this.input.value;
        let url = new Request(`${this.uri}method=${this.queryMethod}&
			api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
        this.sortDirectionUp = null;
        this.sortButton.innerHTML = "Sort";
        return this.getPhotos(url);
    }

    private searchAndRender():PromiseLike<void> {
        let body:any = {};
        let promisesArray:PromiseLike<any>[] = [];
        this.waitImg.style.display = "block";
        return this.search()
            .then((reply:any) => {
                body = reply;
                let photosInfo = body.photos.photo;
                for (let photo of photosInfo) {
                    let photoOwner = photo.owner;
                    promisesArray.push(this.getPhotoOwnerInfo(photoOwner));
                }
                return Q.all(promisesArray);
            })
            .then((owners:owner[]) => {
                for (let owner of owners) {
                    let ownerName:string = owner.person.username["_content"];
                    let ownerId:string = owner.person.id;
                    let own = {
                        name: ownerName
                    };
                    this.ownerNames[ownerId] = own;
                }
                this.waitImg.style.display = "none";
                this.render(body);
            });
    }

    protected sortAndRender():void {
        this.sortDirectionUp = (this.sortDirectionUp === undefined || this.sortDirectionUp === null) ? true : !this.sortDirectionUp;
        if (this.sortDirectionUp) {
            this.photos.sort(this.sortByUp);
            this.sortButton.innerHTML = "Sort &#9650;"
        } else {
            this.photos.sort(this.sortByDown);
            this.sortButton.innerHTML = "Sort &#9660;"
        }
        let photos:any = {
            photo: this.photos
        };
        let body:any = {
            photos: photos
        }
        this.render(body);
    }

    protected getPhotos(input:string|Request):PromiseLike<any> {
        return fetch(input)
            .then((response:Response):PromiseLike<any> => {
                return response.json();
            });
    }

    protected getPhotoOwnerInfo(photoOwner:string):PromiseLike<any> {
        let url = new Request(`${this.uri}method=flickr.people.getInfo&
            api_key=${this.apiKey}&user_id=${photoOwner}&format=json&nojsoncallback=1`);
        return fetch(url)
            .then((response:any) => {
                return response.json();
            });
    }

    protected sortByUp(a:photo, b:photo):number {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    protected sortByDown(a:photo, b:photo):number {
        if (a.title < b.title) {
            return 1;
        }
        if (a.title > b.title) {
            return -1;
        }
        return 0;
    }


}

document.addEventListener('DOMContentLoaded', function () {

    let elem = document.querySelector('.flikr-box') as HTMLDivElement;

    let flickr = new FlickrApp({
        elem: elem,
        uri: 'https://api.flickr.com/services/rest/?',
        queryMethod: 'flickr.photos.search',
        apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
    });

});