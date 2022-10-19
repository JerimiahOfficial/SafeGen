const { ipcRenderer } = require('electron');

const Close = document.getElementById('Close');
const Minimize = document.getElementById('Minimize');
const Generate = document.getElementById('Generate');
const Password = document.getElementById('Password');
const Github = document.getElementById('Github');

Close.addEventListener('click', () => { ipcRenderer.send('Shutdown'); });
Minimize.addEventListener('click', () => { ipcRenderer.send('Hide'); });
Generate.addEventListener('click', () => { ipcRenderer.send('Generate'); });
Github.addEventListener('click', () => { ipcRenderer.send('Github'); });

ipcRenderer.on('NewPassword', (event, arg) => {
  Password.value = arg;
});
