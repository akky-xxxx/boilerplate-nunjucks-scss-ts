import validate from './validate'
import handleCheckByChange from './handleCheckByChange'

const formElement = <HTMLFormElement>document.querySelector('.js-form')

formElement.addEventListener('submit', (event) => {
  const validateTargets = <NodeListOf<HTMLInputElement>>(
    document.querySelectorAll('.js-validate')
  )

  handleCheckByChange(validateTargets)
  const result = validate(validateTargets)
  if (!result) event.preventDefault()
})
