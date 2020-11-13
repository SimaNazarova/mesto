export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items, myId) {
    items.reverse();
    items.forEach((item) => {
      this._renderer(item, myId);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
