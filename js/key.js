class Key {
  constructor(keyName, keyClass) {
    this.keyName = keyName;
    this.keyClass = keyClass;
    this.keyDOM = this.buildHtml();
  }

  buildHtml() {
    const key = document.createElement('li');
    key.className = `keyboard__key ${this.keyClass}`;
    key.innerHTML = `<span class="keyboard__key-main-text">${this.keyName}</span>`;
    return key;
  }
}

export { Key };
