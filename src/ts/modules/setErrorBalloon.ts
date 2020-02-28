import { v4 as uuid } from 'uuid'

const balloonSpace = <HTMLDivElement>document.querySelector('.js-balloon-space')

export default (targetElement: HTMLInputElement, errorMessage: string) => {
  // radio や checkbox 等で error balloon を出したくない場合は処理させない
  const hasNoBalloon = targetElement.classList.contains('js-no-balloon')
  if (hasNoBalloon) return

  const inputRect = targetElement.getBoundingClientRect()
  const style = `left: ${Math.round(inputRect.left)}px`
  const uniqueId = uuid()
  const src = `<div class="Form__errorBalloon js-errorBalloon-${uniqueId}" style="${style}">${errorMessage}</div>`
  balloonSpace.insertAdjacentHTML('beforeend', src)
  const errorBalloon = <HTMLElement>(
    document.querySelector(`.js-errorBalloon-${uniqueId}`)
  )
  const errorBalloonRect = errorBalloon.getBoundingClientRect()
  errorBalloon.style.top = `${window.pageYOffset +
    Math.round(inputRect.top) -
    errorBalloonRect.height}px`
}
