class Key {
  constructor(keyName) {
    this.keyName = keyName;
    this.keyDOM = this._buildHtml();
  }

  _buildHtml() {
    const key = document.createElement('li');
    key.className = 'keyboard__key';
    key.innerHTML = `<span class="keyboard__key-main-text">${this.keyName}</span>`;
    return key;
  }
}

export { Key };
