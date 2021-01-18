const { webFrame, ipcRenderer } = require('electron');

webFrame.setZoomLevel(1);

const nameField = document.querySelector('#name');
const registerHere = document.querySelector('#register-here');
const registerOther = document.querySelector('#register-other');
const userList = document.querySelector('#data');

const register = (name, where) => {
  ipcRenderer.send('user:register', { name, where });
};

registerHere.addEventListener('click', () => {
  register(nameField.value, 'here');
  nameField.value = '';
});

registerOther.addEventListener('click', () => {
  register(nameField.value, 'other');
  nameField.value = '';
});

ipcRenderer.on('user:response', (e, name) => {
  userList.innerHTML = userList.innerHTML + `<li>${name}</li>`;
});
