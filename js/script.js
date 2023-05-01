import { Keyboard } from './keyboard.js';

const body = document.querySelector('body');
const content = document.createElement('div');
const textField = document.createElement('textarea');
const paragraph = document.createElement('p');
const keyboard = new Keyboard('en');

content.className = 'content';
textField.autofocus = true;
textField.rows = 10;
textField.cols = 50;
textField.className = 'content__text';
paragraph.className = 'content__p';
paragraph.textContent = 'The keyboard was created in the Windows operating system';

content.append(textField);
content.append(keyboard.buildKeyboardHtml());
content.append(paragraph);
body.innerHTML = '<h1 class = "title"> RSS Virtual Keyboard </h1>';
body.append(content);

document.querySelector('html').addEventListener('click', (event) => {
  event.preventDefault();
  textField.focus();
});
textField.addEventListener('keydown', (event) => {
  event.preventDefault();
  const pointer = textField.selectionStart;
  switch (event.code) {
    case 'Delete':
      textField.value = textField.value.slice(0, pointer) + textField.value.slice(pointer + 1);
      textField.selectionStart = pointer;
      textField.selectionEnd = textField.selectionStart;
      break;
    case 'Space':
      textField.value += ' ';
      break;
    case 'Backspace':
      if (pointer !== 0) {
        textField.value = textField.value.slice(0, pointer - 1) + textField.value.slice(pointer);
        textField.selectionStart = pointer - 1;
        textField.selectionEnd = textField.selectionStart;
      }
      break;
    case 'Enter':
      textField.value += '\n';
      break;
    case 'Tab':
      textField.value += '    ';
      break;
    case 'AltRight':
      textField.value += '';
      break;
    case 'AltLeft':
      textField.value += '';
      break;
    case 'ControlRight':
      textField.value += '';
      break;
    case 'ControlLeft':
      textField.value += '';
      break;
    case 'MetaLeft':
      textField.value += '';
      break;
    case 'ShiftRight':
      textField.value += '';
      keyboard.isShift = !keyboard.isShift;
      keyboard.keys.forEach((item) => {
        const key = item.keyDOM;
        const first = key.firstElementChild;
        const last = key.lastElementChild;
        if (item.hiddenContent === undefined) {
          if (first.textContent === first.textContent.toUpperCase()) {
            first.textContent = first.textContent.toLowerCase();
          } else {
            first.textContent = first.textContent.toUpperCase();
          }
        } else if (item.hiddenContent !== '') {
          first.classList.add('keyboard__key-additional-text');
          last.classList.remove('keyboard__key-additional-text');
        }
      });
      break;
    case 'ShiftLeft':
      textField.value += '';
      keyboard.isShift = !keyboard.isShift;
      keyboard.keys.forEach((item) => {
        const key = item.keyDOM;
        const first = key.firstElementChild;
        const last = key.lastElementChild;
        if (item.hiddenContent === undefined) {
          if (first.textContent === first.textContent.toUpperCase()) {
            first.textContent = first.textContent.toLowerCase();
          } else {
            first.textContent = first.textContent.toUpperCase();
          }
        } else if (item.hiddenContent !== '') {
          first.classList.add('keyboard__key-additional-text');
          last.classList.remove('keyboard__key-additional-text');
        }
      });
      break;
    case 'CapsLock':
      keyboard.isCaps = !keyboard.isCaps;
      keyboard.keys.forEach((item) => {
        if (item.hiddenContent === undefined) {
          const key = item.keyDOM;
          const first = key.firstElementChild;
          if (first.textContent === first.textContent.toUpperCase()) {
            first.textContent = first.textContent.toLowerCase();
          } else {
            first.textContent = first.textContent.toUpperCase();
          }
        }
      });
      break;
    default:
      for (let i = 0; i < keyboard.keys.length; i += 1) {
        if (event.code === keyboard.keys[i].keyClass) {
          const key = keyboard.keys[i];
          if (keyboard.isShift) {
            if (key.hiddenContent !== undefined && key.hiddenContent !== '') {
              textField.value += key.hiddenContent;
            } else if (keyboard.isCaps) {
              textField.value += key.keyName;
            } else {
              textField.value += key.keyName.toUpperCase();
            }
          } else if (keyboard.isCaps) {
            textField.value += key.keyName.toUpperCase();
          } else {
            textField.value += key.keyName;
          }
        }
      }
  }
  for (let i = 0; i < keyboard.keys.length; i += 1) {
    if (event.code === keyboard.keys[i].keyClass) {
      keyboard.keys[i].keyDOM.classList.add('keyboard__key_active');
    }
  }
});
textField.addEventListener('keyup', (event) => {
  for (let i = 0; i < keyboard.keys.length; i += 1) {
    if (event.code === keyboard.keys[i].keyClass) {
      keyboard.keys[i].keyDOM.classList.remove('keyboard__key_active');
    }
  }
  if (event.code.indexOf('Shift') !== -1) {
    keyboard.isShift = !keyboard.isShift;
    keyboard.keys.forEach((item) => {
      if (item.hiddenContent === undefined) {
        const key = item.keyDOM;
        if (key.firstElementChild.textContent === key.firstElementChild.textContent.toUpperCase()) {
          key.firstElementChild.textContent = key.firstElementChild.textContent.toLowerCase();
        } else {
          key.firstElementChild.textContent = key.firstElementChild.textContent.toUpperCase();
        }
      } else {
        const key = item.keyDOM;
        const first = key.firstElementChild;
        const last = key.lastElementChild;
        if (item.hiddenContent !== '') {
          first.classList.remove('keyboard__key-additional-text');
          last.classList.add('keyboard__key-additional-text');
        }
      }
    });
  }
});
keyboard.keys.forEach((item) => {
  item.keyDOM.addEventListener('mousedown', (event) => {
    event.preventDefault();
  });
  item.keyDOM.addEventListener('click', (event) => {
    event.preventDefault();
    const pointer = textField.selectionStart;
    switch (item.keyClass) {
      case 'Delete':
        textField.value = textField.value.slice(0, pointer) + textField.value.slice(pointer + 1);
        textField.selectionStart = pointer;
        textField.selectionEnd = textField.selectionStart;
        break;
      case 'Space':
        textField.value += ' ';
        break;
      case 'Backspace':
        if (pointer !== 0) {
          textField.value = textField.value.slice(0, pointer - 1) + textField.value.slice(pointer);
          textField.selectionStart = pointer - 1;
          textField.selectionEnd = textField.selectionStart;
        }
        break;
      case 'Enter':
        textField.value += '\n';
        break;
      case 'Tab':
        textField.value += '    ';
        break;
      case 'AltRight':
        textField.value += '';
        break;
      case 'AltLeft':
        textField.value += '';
        break;
      case 'ControlRight':
        textField.value += '';
        break;
      case 'ControlLeft':
        textField.value += '';
        break;
      case 'MetaLeft':
        textField.value += '';
        break;
      case 'ShiftRight':
        textField.value += '';
        break;
      case 'ShiftLeft':
        textField.value += '';
        break;
      case 'CapsLock':
        textField.value += '';
        keyboard.isCaps = !keyboard.isCaps;
        keyboard.keys.forEach((elem) => {
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
        break;
      default:
        if (keyboard.isCaps) {
          textField.value += item.keyName.toUpperCase();
        } else {
          textField.value += item.keyName;
        }
        break;
    }
  });
});
