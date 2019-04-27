const wrapper: HTMLElement = <HTMLElement>(
  document.querySelector('.js-loader-wrapper')
)

const selectors = {
  showState: 'is-show',
  fadeState: 'is-fadeIn',
}

const config = {
  afterFadeOut: 100,
  beforeFadeIn: 0,
}

export default function Loader() {
  wrapper.style.transitionDuration = `${config.afterFadeOut}ms`

  const fadeIn = async () => {
    // wrapper の display が完全に変わった後に実行させるための setTimeout
    await new Promise((resolve) =>
      setTimeout(() => {
        wrapper.classList.add(selectors.fadeState)
        return resolve()
      }, config.beforeFadeIn),
    )
  }

  const fadeOut = () => {
    wrapper.classList.remove(selectors.fadeState)
  }

  return {
    async handleShow() {
      wrapper.classList.add(selectors.showState)
      await fadeIn()
    },
    async handleHide() {
      fadeOut()
      await new Promise((resolve) =>
        // opacity が 0 になってから display 等を変えるための setTimeout
        setTimeout(() => {
          wrapper.classList.remove(selectors.showState)
          return resolve()
        }, config.afterFadeOut),
      )
    },
  }
}
