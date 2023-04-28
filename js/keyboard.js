import { keyboardLayoutEng } from './keyboard-layouts.js';
import { Key } from './key.js';
import { KeySpecial } from './key-special.js';

const kWidth = '35px';

function buildKeyboard() {
  const rowLength = [14, 15, 13, 13, 9];
  let keyboardInd = 0;
  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';

  for (let i = 0; i < rowLength.length; i += 1) {
    const row = document.createElement('ul');
    row.className = 'keyboard__row';

    for (let j = 0; j < rowLength[i]; j += 1) {
      const kInfo = keyboardLayoutEng[keyboardInd];
      const key = (kInfo.special)
        ? new KeySpecial(kInfo.name, kWidth, kInfo.hiddenName)
        : new Key(kInfo.name, kWidth);
      const keyDom = key.buildHtml();
      row.append(keyDom);
      keyboardInd += 1;
    }
    keyboard.append(row);
  }
  return keyboard;
}

export { buildKeyboard };
