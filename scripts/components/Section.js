export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach( (element) => {
            this._cardElement = this._renderer(element);
            this.addItem(this._cardElement);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }
}