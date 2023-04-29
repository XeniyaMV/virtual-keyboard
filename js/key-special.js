import { Key } from './key.js';

class KeySpecial extends Key {
  constructor(keyName, hiddenContent) {
    super(keyName);
    this.hiddenContent = hiddenContent;
    this.keyDOM = this._buildHtml();
  }

  _buildHtml() {
    const key = super._buildHtml();
    if (this.hiddenContent === '') {
      key.classList.add('keyboard__key_special');
    }
    if (this.keyName === '') {
      key.classList.add('keyboard__key_special_space');
    } else if (this.keyName === 'Alt') {
      key.classList.add('keyboard__key_special_alt');
    } else if (this.keyName === 'Ctrl') {
      key.classList.add('keyboard__key_special_ctrl');
    } else if (this.keyName === 'Tab') {
      key.classList.add('keyboard__key_special_tab');
    } else if (this.keyName === 'CapsLock') {
      key.classList.add('keyboard__key_special_caps');
    } else if (this.keyName === 'Enter') {
      key.classList.add('keyboard__key_special_enter');
    } else if (this.keyName === 'Shift') {
      key.classList.add('keyboard__key_special_shift');
    } else if (this.keyName === 'Del') {
      key.classList.add('keyboard__key_special_del');
    } else if (this.keyName === 'Win') {
      key.classList.add('keyboard__key_special_win');
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
