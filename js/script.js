import { buildKeyboard } from './keyboard.js';

const body = document.querySelector('body');
const content = document.createElement('div');
const textField = document.createElement('input');
const keyBoard = buildKeyboard();

textField.type = 'text';

content.className = 'content';
textField.className = 'content__text';

content.append(textField);
content.append(keyBoard);
body.innerHTML = '<h1 class = "title"> RSS Virtual Keyboard </h1>';
body.append(content);
