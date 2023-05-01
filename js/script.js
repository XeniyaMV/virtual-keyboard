import { Keyboard } from './keyboard.js';

const body = document.querySelector('body');
const content = document.createElement('div');
const textField = document.createElement('textarea');
const paragraph1 = document.createElement('p');
const paragraph2 = document.createElement('p');
let keyboard = (localStorage.getItem('layout')) ? new Keyboard(localStorage.getItem('layout'), textField) : new Keyboard('en', textField);
let keyboardDOM = keyboard.buildKeyboardHtml();

content.className = 'content';
textField.autofocus = true;
textField.rows = 10;
textField.cols = 50;
textField.className = 'content__text';
paragraph1.className = 'content__p';
paragraph2.className = 'content__p';
paragraph1.textContent = 'The keyboard was created in the Windows operating system';
paragraph2.innerHTML = 'Use <b>ctrl + alt</b> to switch language';

content.append(textField);
content.append(keyboardDOM);
content.append(paragraph1);
content.append(paragraph2);
body.innerHTML = '<h1 class = "title"> RSS Virtual Keyboard </h1>';
body.append(content);

document.querySelector('html').addEventListener('click', (event) => {
  event.preventDefault();
  textField.focus();
});
textField.addEventListener('keydown', (event) => {
  event.preventDefault();
  const pointer = textField.selectionStart;
  const text = textField.value;
  switch (event.code) {
    case 'Delete':
      textField.value = textField.value.slice(0, pointer) + textField.value.slice(pointer + 1);
      textField.selectionStart = pointer;
      textField.selectionEnd = textField.selectionStart;
      break;
    case 'Space':
      textField.value = `${text.slice(0, pointer)} ${text.slice(pointer)}`;
      textField.selectionStart = pointer + 1;
      textField.selectionEnd = textField.selectionStart;
      break;
    case 'Backspace':
      if (pointer !== 0) {
        textField.value = textField.value.slice(0, pointer - 1) + textField.value.slice(pointer);
        textField.selectionStart = pointer - 1;
        textField.selectionEnd = textField.selectionStart;
      }
      break;
    case 'Enter':
      textField.value = `${text.slice(0, pointer)}\n${text.slice(pointer)}`;
      textField.selectionStart = pointer + 1;
      textField.selectionEnd = textField.selectionStart;
      break;
    case 'Tab':
      textField.value = `${text.slice(0, pointer)}    ${text.slice(pointer)}`;
      textField.selectionStart = pointer + 4;
      textField.selectionEnd = textField.selectionStart;
      break;
    case 'AltRight':
      if (event.ctrlKey) {
        if (keyboard.layout === 'rus') {
          localStorage.setItem('layout', 'en');
          keyboard = new Keyboard('en', textField);
          keyboardDOM.remove();
          keyboardDOM = keyboard.buildKeyboardHtml();
          textField.after(keyboardDOM);
        } else {
          localStorage.setItem('layout', 'rus');
          keyboard = new Keyboard('rus', textField);
          keyboardDOM.remove();
          keyboardDOM = keyboard.buildKeyboardHtml();
          textField.after(keyboardDOM);
        }
      }
      break;
    case 'AltLeft':
      if (event.ctrlKey) {
        if (keyboard.layout === 'rus') {
          localStorage.setItem('layout', 'en');
          keyboard = new Keyboard('en', textField);
          keyboardDOM.remove();
          keyboardDOM = keyboard.buildKeyboardHtml();
          textField.after(keyboardDOM);
        } else {
          localStorage.setItem('layout', 'rus');
          keyboard = new Keyboard('rus', textField);
          keyboardDOM.remove();
          keyboardDOM = keyboard.buildKeyboardHtml();
          textField.after(keyboardDOM);
        }
      }
      break;
    case 'ControlRight':
      break;
    case 'ControlLeft':
      break;
    case 'MetaLeft':
      break;
    case 'ShiftRight':
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
              textField.value = text.slice(0, pointer) + key.hiddenContent + text.slice(pointer);
            } else if (keyboard.isCaps) {
              textField.value = text.slice(0, pointer) + key.keyName + text.slice(pointer);
            } else {
              textField.value = text.slice(0, pointer)
                + key.keyName.toUpperCase()
                + text.slice(pointer);
            }
          } else if (keyboard.isCaps) {
            textField.value = text.slice(0, pointer)
              + key.keyName.toUpperCase()
              + text.slice(pointer);
          } else {
            textField.value = text.slice(0, pointer) + key.keyName + text.slice(pointer);
          }
          textField.selectionStart = pointer + 1;
          textField.selectionEnd = textField.selectionStart;
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
