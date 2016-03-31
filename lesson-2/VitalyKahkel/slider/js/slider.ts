interface coord {
    top:number;
    left:number;
}

/**
 * при объявлении переменной класса необходимо задавать:
 * - минимальное значение, отображаемое на слайдере;
 * - максимальное значение, отображаемое на слайдере;
 * - начальное значение ползунка на слайдере (между мин и макс);
 * Разница между МИН и МАКС не может быть меньше 10 (иначе она будет так установлена по умолчанию)
 * Если начальное положение будет задано меньше МИН или больше МАКС, то будет установлено на МИН
 */
class Slider {
    constructor(private minVal:number,
                private maxVal:number,
                private val:number) {
        this.maxVal = (this.maxVal > (this.minVal + 10) ? this.maxVal : this.minVal + 10);
        this.val = ((this.val < this.minVal) || (this.val > this.maxVal)) ? this.minVal : this.val;
    }

    private roundMod(num:number, mod:number):number {
        return Math.round(num / mod) * mod;
    }

    private getCoords(elem:HTMLElement) {
        let box = elem.getBoundingClientRect();
        console.log(box);
        let boxCoord:coord = {
            top: box.top,
            left: box.left
        };
        return boxCoord;
    }
 /** разбить на методы если возможно**/
    create():void {
        let sliderElem:HTMLElement = <HTMLElement>document.querySelector("#slider");
        let sliderWidth:number = sliderElem.offsetWidth;
        let sliderCoords:coord = this.getCoords(sliderElem);
        let thumbLeft = this.roundMod((this.val - this.minVal) / (this.maxVal - this.minVal) * sliderWidth, 1);

        let thumbElem:HTMLElement = <HTMLElement>document.querySelector("#thumb");
        thumbElem.style.left = thumbLeft + "px";

        let infoElem:HTMLElement = <HTMLElement>document.querySelector("#val");
        let minElem:HTMLElement = <HTMLElement>document.querySelector("#min");
        let maxElem:HTMLElement = <HTMLElement>document.querySelector("#max");

        minElem.innerHTML = this.minVal + "";
        maxElem.innerHTML = this.maxVal + "";
        infoElem.innerHTML = this.val + "";

        thumbElem.onmousedown = (ev:MouseEvent) => {
            let thumbCoords:coord = this.getCoords(thumbElem);
            let shiftX = ev.pageX - thumbCoords.left;
            console.log("shiftX = " + shiftX);

            document.onmousemove = (ev:MouseEvent) => {
                let newLeft = ev.pageX - shiftX - sliderCoords.left;
                if (newLeft < 0) {
                    newLeft = 0;
                }

                let rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
                if (newLeft > rightEdge) {
                    newLeft = rightEdge;
                }

                thumbElem.style.left = newLeft + 'px';
                this.val = this.roundMod(newLeft * (this.maxVal - this.minVal) / (sliderWidth - thumbElem.offsetWidth) + this.minVal, 1);
                infoElem.innerHTML = this.val + "";
            }

            document.onmouseup = () => {
                document.onmousemove = document.onmouseup = null;
            }

            return false;
        }

        thumbElem.ondragstart = () => {
            return false;
        }

    }
}

document.addEventListener('DOMContentLoaded', function () {
    let mySlider = new Slider(100, 500, 200);
    mySlider.create();
});