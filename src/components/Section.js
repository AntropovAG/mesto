export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, id) {
    items.forEach((item) => this._renderer(item, id))
  }

  addItem(element) {
    this._container.prepend(element)
  }

}
