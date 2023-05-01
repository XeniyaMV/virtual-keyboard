import { keyboardLayoutEng, keyboardLayoutRus } from './keyboard-layouts.js';
import { Key } from './key.js';
import { KeySpecial } from './key-special.js';

class Keyboard {
  constructor(layout, textField) {
    this.layout = layout;
    this.textField = textField;
    this.keys = [];
    this.isCaps = false;
    this.isShift = false;
    this.buildKeyboard();
    this.keyboard = this.buildKeyboardHtml();

    this.keys.forEach((item) => {
      item.keyDOM.addEventListener('mousedown', (event) => {
        event.preventDefault();
      });
      item.keyDOM.addEventListener('click', (event) => {
        event.preventDefault();
        const pointer = this.textField.selectionStart;
        switch (item.keyClass) {
          case 'Delete':
            this.textField.value = this.textField.value.slice(0, pointer)
              + this.textField.value.slice(pointer + 1);
            this.textField.selectionStart = pointer;
            this.textField.selectionEnd = this.textField.selectionStart;
            break;
          case 'Space':
            this.textField.value = `${this.textField.value.slice(0, pointer)} ${this.textField.value.slice(pointer)}`;
            this.textField.selectionStart = pointer + 1;
            this.textField.selectionEnd = textField.selectionStart;
            break;
          case 'Backspace':
            if (pointer !== 0) {
              this.textField.value = `${textField.value.slice(0, pointer - 1)}${this.textField.value.slice(pointer)}`;
              this.textField.selectionStart = pointer - 1;
              this.textField.selectionEnd = this.textField.selectionStart;
            }
            break;
          case 'Enter':
            this.textField.value = `${this.textField.value.slice(0, pointer)}\n${this.textField.value.slice(pointer)}`;
            this.textField.selectionStart = pointer + 1;
            this.textField.selectionEnd = textField.selectionStart;
            break;
          case 'Tab':
            this.textField.value = `${this.textField.value.slice(0, pointer)}    ${this.textField.value.slice(pointer)}`;
            this.textField.selectionStart = pointer + 4;
            this.textField.selectionEnd = textField.selectionStart;
            break;
          case 'AltRight':
            break;
          case 'AltLeft':
            break;
          case 'ControlRight':
            break;
          case 'ControlLeft':
            break;
          case 'MetaLeft':
            break;
          case 'ShiftRight':
            break;
          case 'ShiftLeft':
            break;
          case 'CapsLock':
            this.isCaps = !this.isCaps;
            this.keys.forEach((elem) => {
              if (elem.hiddenContent === undefined) {
                const key = elem.keyDOM;
                const first = key.firstElementChild;
                if (first.textContent === first.textContent.toUpperCase()) {
                  first.textContent = first.textContent.toLowerCase();
                } else {
                  first.textContent = first.textContent.toUpperCase();
                }
              }
            });
            this.textField.selectionStart = pointer + 1;
            this.textField.selectionEnd = textField.selectionStart;
            break;
          default:
            if (this.isCaps) {
              this.textField.value = this.textField.value.slice(0, pointer)
                + item.keyName.toUpperCase()
                + this.textField.value.slice(pointer);
            } else {
              this.textField.value = this.textField.value.slice(0, pointer)
                + item.keyName
                + this.textField.value.slice(pointer);
            }
            this.textField.selectionStart = pointer + 1;
            this.textField.selectionEnd = textField.selectionStart;
            break;
        }
      });
    });
  }

  buildKeyboard() {
    let keyboardLayout = keyboardLayoutEng;
    if (this.layout === 'rus') {
      keyboardLayout = keyboardLayoutRus;
    }
    for (let i = 0; i < keyboardLayout.length; i += 1) {
      const kInfo = keyboardLayout[i];
      const key = (kInfo.special)
        ? new KeySpecial(kInfo.name, kInfo.class, kInfo.hiddenName)
        : new Key(kInfo.name, kInfo.class);
      this.keys.push(key);
    }
  }

  buildKeyboardHtml() {
    const rowLength = [14, 15, 13, 13, 9];
    let keyboardInd = 0;
    const keyboard = document.createElement('div');
    keyboard.className = 'keyboard';

    for (let i = 0; i < rowLength.length; i += 1) {
      const row = document.createElement('ul');
      row.className = 'keyboard__row';

      for (let j = 0; j < rowLength[i]; j += 1) {
        row.append(this.keys[keyboardInd].keyDOM);
        keyboardInd += 1;
      }
      keyboard.append(row);
    }
    return keyboard;
  }
}

export { Keyboard };
