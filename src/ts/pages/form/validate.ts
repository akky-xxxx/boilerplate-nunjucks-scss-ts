import validationMain from '../../modules/validationMain'
import setErrorBalloon from '../../modules/setErrorBalloon'

const balloonSpace = <HTMLDivElement>document.querySelector('.js-balloon-space')

export default (validateTargets: NodeListOf<HTMLInputElement>): boolean => {
  balloonSpace.innerHTML = ''
  const results: boolean[] = Array.from(validateTargets).map(
    (targetElement: HTMLInputElement) => {
      const errorMessage = validationMain(targetElement)
      if (!errorMessage) return true

      // エラーメッセージがある場合にエラーバルーンを生成する
      setErrorBalloon(targetElement, errorMessage)
      return false
    },
  )

  return results.every((v) => v)
}
