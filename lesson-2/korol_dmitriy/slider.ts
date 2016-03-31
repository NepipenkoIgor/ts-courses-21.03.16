class Slider {
    sliderElem:HTMLElement;
    thumbElem:HTMLElement;
    /**зачем? ни какого сохранения контекста? self!!!!**/
    constructor(elementId:string) {
        let _self = this;

        _self.sliderElem = document.getElementById(elementId);
        if (!_self.sliderElem) {
            throw new Error(`[Error] Can't initialize slider. Element #${elementId} isn't found.`);
        }

        //create thumb
        _self.thumbElem = document.createElement("div");
        _self.thumbElem.className = "thumb";
        _self.sliderElem.appendChild(_self.thumbElem);

        _self.thumbElem.ondragstart = () => false;
        _self.thumbElem.onmousedown = (event:MouseEvent) => {
            _self._mouseMove(event);
        };
    }

    protected _getCoords(elem:HTMLElement) {
        let top, left;
        return {top, left} = elem.getBoundingClientRect();
    }

    protected _mouseMove(event:MouseEvent) {
        let _self = this;

        let thumbCoords = _self._getCoords(_self.thumbElem);
        let shiftX = event.pageX - thumbCoords.left;
        // shiftY здесь не нужен, слайдер двигается только по горизонтали

        let sliderCoords = _self._getCoords(_self.sliderElem);

        document.onmousemove = (event:MouseEvent) => {
            //  вычесть координату родителя, т.к. position: relative
            var newLeft = event.pageX - shiftX - sliderCoords.left;

            if (newLeft < 0) {
                newLeft = 0;
            }
            var rightEdge = _self.sliderElem.offsetWidth - _self.thumbElem.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            _self.thumbElem.style.left = newLeft + 'px';
        }

        document.onmouseup = () => {
            document.onmousemove = document.onmouseup = null;
        };

        return false;
    }


}

let slider = new Slider('slider');