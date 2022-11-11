const { ipcRenderer } = require('electron');

// Get all inputs from the UI
const inputs = document.getElementsByTagName('input');

// Renderer Updates
ipcRenderer.on('NewPassword', (_event, arg) => {
  document.getElementById('Password').value = arg;
});

// click event handler for all buttons

// Loop through all inputs
for (let i = 0; i < inputs.length; i += 1) {
  // Check if input is a button
  if (inputs[i].type === 'button') {
    inputs[i].addEventListener('click', () => {
      // check if the input has an id
      if (inputs[i].id === null) return;

      // Send event to main process
      ipcRenderer.send(inputs[i].id);
    });
  }
}

// checkbox event handler for all checkboxes
for (let i = 0; i < inputs.length; i += 1) {
  // Check if input is a checkbox
  if (inputs[i].type === 'checkbox') {
    inputs[i].addEventListener('click', () => {
      // check if the input has an id
      if (inputs[i].id === null) return;

      // Send event to main process
      ipcRenderer.send(inputs[i].id, inputs[i].checked);
    });
  }
}
