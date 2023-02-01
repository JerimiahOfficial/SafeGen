// Variables
const inputs = document.querySelectorAll('input')
const Textbox = document.getElementById('Password') as HTMLInputElement
const PassLen = document.getElementById('PassLen') as HTMLElement

// Event handler
inputs.forEach((input) => {
  switch (input.type) {
    case 'button':
    case 'image':
      input.addEventListener('click', () => {
        switch (input.id) {
          case 'Generate':
            void window.api.generatePassword().then((password) => {
              Textbox.value = password
            })
            break

          default:
            window.api.buttonEvent(input.id)
            break
        }
      })
      break

    case 'checkbox':
      input.addEventListener('change', () => {
        window.api.updateSettings(input.id, input.checked)
      })
      break

    case 'range':
      input.addEventListener('input', () => {
        window.api.updateSettings(input.id, parseInt(input.value))
        PassLen.innerHTML = `Password Length: ${input.value}`
      })
      break

    default:
      break
  }
})
