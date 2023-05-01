import { Key } from './key.js';

class KeySpecial extends Key {
  constructor(keyName, keyClass, hiddenContent) {
    super(keyName, keyClass);
    this.hiddenContent = hiddenContent;
    this.keyDOM = this.buildHtml();
  }

  buildHtml() {
    const key = super.buildHtml();
    if (this.hiddenContent === '') {
      key.classList.add('keyboard__key_special');
    }

    if (this.hiddenContent !== '') {
      const addContent = document.createElement('span');
      addContent.className = 'keyboard__key-additional-text';
      addContent.append(this.hiddenContent);
      key.append(addContent);
    }
    return key;
  }
}

export { KeySpecial };
