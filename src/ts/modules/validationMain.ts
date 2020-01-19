import { combine } from 'favalid'
import {
  checkBlank,
  checkNumber,
  checkMax,
  checkMin,
  checkEqual,
  checkRadio,
  checkCheckbox,
  checkSelect,
} from './validationRules'

export default (targetElement: HTMLInputElement) => {
  const isRequired = targetElement.hasAttribute('required')
  if (!isRequired && !targetElement.value) return ''

  const validateRules = []
  const needValidateRules = <string>targetElement.dataset.validationRules

  validateRules.push(checkBlank)

  if (needValidateRules.includes('number')) {
    validateRules.push(checkNumber)
  }

  if (needValidateRules.includes('maxLength')) {
    const maxNumber = parseInt(
      <string>targetElement.dataset.validationMaxLengh,
      10,
    )
    validateRules.push(checkMax(maxNumber))
  }

  if (needValidateRules.includes('minLength')) {
    const minNumber = parseInt(
      <string>targetElement.dataset.validationMinLength,
      10,
    )
    validateRules.push(checkMin(minNumber))
  }

  if (needValidateRules.includes('equalLength')) {
    const equalNumber = parseInt(
      <string>targetElement.dataset.validationEqualLengh,
      10,
    )
    validateRules.push(checkEqual(equalNumber))
  }

  if (needValidateRules.includes('radio') && isRequired) {
    validateRules.push(checkRadio)
  }

  if (needValidateRules.includes('checkbox') && isRequired) {
    validateRules.push(checkCheckbox)
  }

  if (needValidateRules.includes('select')) {
    validateRules.push(checkSelect)
  }

  return combine(...validateRules)(targetElement).message
}
