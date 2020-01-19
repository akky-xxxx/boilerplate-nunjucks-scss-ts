import { tester } from 'favalid'

export const checkBlank = tester(
  (targetElement) => targetElement.value,
  () => '入力してください',
)

export const checkNumber = tester(
  (targetElement) => /^[\d]+$/.test(targetElement.value),
  () => '数字で入力してください',
)

export const checkMax = (maxNumber: number) =>
  tester(
    (targetElement) => targetElement.value.length <= maxNumber,
    () => `${maxNumber}文字以内で入力してください`,
  )

export const checkMin = (minNumber: number) =>
  tester(
    (targetElement) => targetElement.value.length >= minNumber,
    () => `${minNumber}文字以上で入力してください`,
  )

export const checkEqual = (equalNumber: number) =>
  tester(
    (targetElement) => targetElement.value.length === equalNumber,
    () =>
      `${equalNumber}文字で入力してください。<br>繰り返す。${equalNumber}文字で入力してください`,
  )

export const checkRadio = tester(
  (targetElement: HTMLInputElement) => {
    const targetName = targetElement.getAttribute('name')
    const targetElements = <NodeListOf<HTMLInputElement>>(
      document.querySelectorAll(`[name=${targetName}]`)
    )
    return Array.from(targetElements).some(
      (element: HTMLInputElement) => element.checked,
    )
  },
  () => '選択してください',
)

export const checkCheckbox = tester(
  (targetElement: HTMLInputElement) => {
    const targetName = targetElement.getAttribute('name')
    const targetElements = <NodeListOf<HTMLInputElement>>(
      document.querySelectorAll(`[name=${targetName}]`)
    )
    return Array.from(targetElements).some(
      (element: HTMLInputElement) => element.checked,
    )
  },
  () => '一つ以上選択してください',
)

export const checkSelect = tester(
  (targetElement: HTMLInputElement) => Boolean(targetElement.value),
  () => '選択してください',
)
