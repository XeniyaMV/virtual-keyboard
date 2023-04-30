import { Keyboard } from './keyboard.js';

const body = document.querySelector('body');
const content = document.createElement('div');
const textField = document.createElement('textarea');
const keyboard = new Keyboard('en');
let isCaps = 0;

content.className = 'content';
textField.autofocus = true;
textField.rows = 10;
textField.cols = 50;
textField.className = 'content__text';

content.append(textField);
content.append(keyboard.buildKeyboardHtml());
body.innerHTML = '<h1 class = "title"> RSS Virtual Keyboard </h1>';
body.append(content);

document.querySelector('html').addEventListener('click', (event) => {
  event.preventDefault();
  textField.focus();
});

//TODO: need to fix capslock

textField.addEventListener('keydown', (event) => {
  let capsTurn = 0;
  for (let i = 0; i < keyboard.keys.length; i += 1) {
    if (event.code === keyboard.keys[i].keyClass) {
      keyboard.keys[i].keyDOM.classList.add('keyboard__key_active');
      if (event.code === 'Tab') {
        event.preventDefault();
        textField.value += '    ';
      } else if (event.code.indexOf('Arrow') !== -1) {
        event.preventDefault();
        textField.value += keyboard.keys[i].keyName;
      } else if (event.code.indexOf('Meta') !== -1) {
        event.preventDefault();
      } else if (event.code.indexOf('Alt') !== -1) {
        event.preventDefault();
      } else if (event.code === 'CapsLock') {
        capsTurn = 1;
        keyboard.keys.forEach((item) => {
          if (item.hiddenContent === undefined) {
            const first = item.keyDOM.firstElementChild;
            const last = item.keyDOM.lastElementChild;
            if (!isCaps) {
              first.textContent = first.textContent.toUpperCase();
              last.textContent = last.textContent.toUpperCase();
            } else {
              first.textContent = first.textContent.toLowerCase();
              last.textContent = last.textContent.toLowerCase();
            }
          }
        });
      } else if (event.code.indexOf('Shift') !== -1) {
        keyboard.keys.forEach((item) => {
          if (!item.keyDOM.classList.contains('keyboard__key_special')) {
            if (item.hiddenContent) {
              const first = item.keyDOM.firstElementChild;
              const last = item.keyDOM.lastElementChild;
              first.classList.add('keyboard__key-additional-text');
              last.classList.remove('keyboard__key-additional-text');
            } else {
              const first = item.keyDOM.firstElementChild;
              const last = item.keyDOM.lastElementChild;
              if (!isCaps) {
                first.textContent = first.textContent.toUpperCase();
                last.textContent = last.textContent.toUpperCase();
              } else {
                first.textContent = first.textContent.toLowerCase();
                last.textContent = last.textContent.toLowerCase();
              }
            }
          }
        });
      }
    }
  }
  if (capsTurn) {
    isCaps = (isCaps === 0) ? 1 : 0;
  }
});
textField.addEventListener('keyup', (event) => {
  for (let i = 0; i < keyboard.keys.length; i += 1) {
    if (event.code === keyboard.keys[i].keyClass) {
      keyboard.keys[i].keyDOM.classList.remove('keyboard__key_active');
      if (event.code.indexOf('Shift') !== -1) {
        keyboard.keys.forEach((item) => {
          if (!item.keyDOM.classList.contains('keyboard__key_special')) {
            const first = item.keyDOM.firstElementChild;
            const last = item.keyDOM.lastElementChild;
            if (item.hiddenContent) {
              first.classList.remove('keyboard__key-additional-text');
              last.classList.add('keyboard__key-additional-text');
            } else {
              if (!isCaps) {
                first.textContent = first.textContent.toLowerCase();
                last.textContent = last.textContent.toLowerCase();
              } else {
                first.textContent = first.textContent.toUpperCase();
                last.textContent = last.textContent.toUpperCase();
              }
            }
          }
        });
      }
    }
  }
});
