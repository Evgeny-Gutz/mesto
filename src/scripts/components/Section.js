export default class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        this._items = items;
        this._items.forEach( (element) => {
            this._cardElement = this._renderer(element);
            this.addItem(this._cardElement);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}