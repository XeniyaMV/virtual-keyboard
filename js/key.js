class Key {
  constructor(keyName, width) {
    this.keyName = keyName;
    this.width = width;
  }

  buildHtml() {
    const key = document.createElement('li');
    key.className = 'keyboard__key';
    key.innerHTML = `<span class="keyboard__key-main-text">${this.keyName}</span>`;
    return key;
  }
}

export { Key };
