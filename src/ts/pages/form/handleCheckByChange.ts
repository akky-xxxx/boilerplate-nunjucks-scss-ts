import validate from './validate'

export default (validateTargets: NodeListOf<HTMLInputElement>) => {
  const handleChange = () => validate(validateTargets)

  Array.from(validateTargets).forEach((element: HTMLInputElement) => {
    element.removeEventListener('change', handleChange)
    element.removeEventListener('keyup', handleChange)
    element.addEventListener('change', handleChange)
    element.addEventListener('keyup', handleChange)
  })
}
