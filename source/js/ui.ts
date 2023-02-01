// Variables
const inputs = document.querySelectorAll('input')

// Event handler
inputs.forEach((input) => {
  switch (input.type) {
    case 'button':
    case 'image':
      input.addEventListener('click', () => {
        switch (input.id) {
          case 'Generate':
            void window.api.generatePassword().then((password) => {
              const Textbox = document.getElementById('Password') as HTMLInputElement

              if (Textbox === null) return

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

    default:
      break
  }
})
