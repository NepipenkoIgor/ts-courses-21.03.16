type Coords = {top:number, left:number};


/***хотелось бы увидеть несколько методов*/
class Slider {

  protected sliderElem:HTMLElement;
  protected thumbElem:HTMLElement;

  private getCoords = function(elem: HTMLElement):Coords { // кроме IE8-
    let box:ClientRect = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  constructor(private id:string) {
    this.sliderElem = document.getElementById(id) as HTMLElement;

    this.sliderElem.innerHTML = `<div class="thumb"></div>`;
    this.thumbElem = this.sliderElem.children[0] as HTMLElement;

    this.thumbElem.onmousedown = (e:MouseEvent):boolean => {
      let thumbCoords:Coords = this.getCoords(this.thumbElem);
      let shiftX:number = e.pageX - thumbCoords.left;

      let sliderCoords:Coords = this.getCoords(this.sliderElem);

      document.onmousemove = (e:MouseEvent):void => {
        //  вычесть координату родителя, т.к. position: relative
        let newLeft:number = e.pageX - shiftX - sliderCoords.left;

        // курсор ушёл вне слайдера
        if (newLeft < 0) {
          newLeft = 0;
        }
        let rightEdge:number = this.sliderElem.offsetWidth - this.thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }

        this.thumbElem.style.left = newLeft + 'px';
      };

      document.onmouseup = ():void => {
        document.onmousemove = document.onmouseup = null;
      };

      return false; // disable selection start (cursor change)
    };
  }

}

let mySlider = new Slider('slider');