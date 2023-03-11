// Variables
const inputs = document.querySelectorAll('input')
const Textbox = document.getElementById('Password') as HTMLInputElement
const PassLen = document.getElementById('length') as HTMLInputElement
const PassLenVal = document.getElementById('PassLen') as HTMLElement

// Checkboxes
const Uppercase = document.getElementById('Upper') as HTMLInputElement
const Lowercase = document.getElementById('Lower') as HTMLInputElement
const Numbers = document.getElementById('Number') as HTMLInputElement
const Symbols = document.getElementById('Symbol') as HTMLInputElement

// Event handler
inputs.forEach((input) => {
  switch (input.type) {
    case 'button':
    case 'image':
      input.addEventListener('click', () => {
        if (input.id === 'Generate') {
          void window.api.generatePassword(
            parseInt(PassLen.value),
            Uppercase.checked,
            Lowercase.checked,
            Numbers.checked,
            Symbols.checked
          ).then((password) => {
            Textbox.value = password
          })
        } else {
          window.api.buttonEvent(input.id)
        }
      })
      break

    case 'range':
      input.addEventListener('input', () => {
        PassLenVal.innerHTML = `Password Length: ${input.value}`
      })
      break

    default:
      break
  }
})
