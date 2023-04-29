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


textField.addEventListener('keydown', function(event) {
  console.log(event.key);
  let key = event.key;

  if (event.code === 'Space') {
    key = '';
  }
  switch (event.key) {
    case 'Delete':
      key = 'Del';
      break;
    case 'Control':
      key = 'Ctrl';
      break;
    case 'Meta':
      key = 'Win';
      break;
  }
  for (let i = 0; i < keyboard.keys.length; i += 1) {
    if (key === keyboard.keys[i].keyName) {
      console.log(event.key, keyboard.keys[i].keyName);
      keyboard.keys[i].keyDOM.classList.add('keyboard__key_active');
      setTimeout(() => keyboard.keys[i].keyDOM.classList.remove('keyboard__key_active'), 500);
    }
  }
});
textField.addEventListener('keyup', function(event) {
  let key = event.key;
  if (event.code === 'Space') {
    key = '';
  }
  switch (event.key) {
    case 'Delete':
      key = 'Del';
      break;
    case 'Control':
      key = 'Ctrl';
      break;
    case 'Meta':
      key = 'Win';
      break;
  }
  for (let i = 0; i < keyboard.keys.length; i += 1) {
    if (key === keyboard.keys[i].keyName) {
      keyboard.keys[i].keyDOM.classList.remove('keyboard__key_active');
    }
  }
})
