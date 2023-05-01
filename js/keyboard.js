import { keyboardLayoutEng, keyboardLayoutRus } from './keyboard-layouts.js';
import { Key } from './key.js';
import { KeySpecial } from './key-special.js';

class Keyboard {
  constructor(layout) {
    this.layout = layout;
    this.keys = [];
    this.isCaps = false;
    this.isShift = false;
    this.buildKeyboard();
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
