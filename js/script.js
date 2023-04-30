import { Keyboard } from './keyboard.js';

const body = document.querySelector('body');
const content = document.createElement('div');
const textField = document.createElement('textarea');
const keyboard = new Keyboard('en');

content.className = 'content';
textField.autofocus = true;
textField.rows = 10;
textField.cols = 50;
textField.className = 'content__text';

content.append(textField);
content.append(keyboard.buildKeyboardHtml());
body.innerHTML = '<h1 class = "title"> RSS Virtual Keyboard </h1>';
body.append(content);

body.addEventListener('click', (event) => {
  event.preventDefault();
  textField.focus();
});

textField.addEventListener('keydown', (event) => {
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
});
