/**
 * @description class のプロパティおよび constructor の elements 共通型定義
 * @property showTrigger: NodeListOf<HTMLElement>
 * @property hideOkTrigger: NodeListOf<HTMLElement>
 * @property hideCancelTrigger: NodeListOf<HTMLElement>
 * @property modalWrapper: HTMLElement
 */
interface Elements {
  showTrigger: NodeListOf<HTMLElement>
  hideOkTrigger: NodeListOf<HTMLElement>
  hideCancelTrigger: NodeListOf<HTMLElement>
  modalWrapper: HTMLElement
}

/**
 * @description constructor の elements の型定義
 */
interface ModalBaseProps {
  elements: Elements
}

/**
 * @description class のプロパティの型定義
 * @extends Elements
 * @property body: HTMLElement
 */
interface ElementProperty extends Elements {
  body: HTMLElement
  mainContents: HTMLElement
}

export default class ModalBase {
  config: {
    afterFadeOut: number
    beforeFadeIn: number
  }

  elements: ElementProperty
  selectors: {
    lockBody: 'is-bodyLock'
    showState: 'is-show'
    fadeState: 'is-fadeIn'
    blurState: 'is-blur'
  }

  constructor(props: ModalBaseProps) {
    this.elements = {
      ...props.elements,
      body: document.body,
      mainContents: <HTMLElement>document.querySelector('.js-mainContents'),
    }

    this.selectors = {
      lockBody: 'is-bodyLock',
      showState: 'is-show',
      fadeState: 'is-fadeIn',
      blurState: 'is-blur',
    }

    this.config = {
      afterFadeOut: 100,
      beforeFadeIn: 0,
    }

    this.setTransitionDuration()
  }

  /**
   * @description css の transition-duration と setTimeout の辻褄を合わせる為の処理
   */
  private setTransitionDuration() {
    const {
      elements: { modalWrapper },
      config: { afterFadeOut },
    } = this
    modalWrapper.style.transitionDuration = `${afterFadeOut}ms`
  }

  /**
   * @description addEventListener のバンドル
   */
  bindAddEventListener() {
    const { elements } = this

    Array.from(elements.showTrigger).forEach((showTrigger) => {
      showTrigger.addEventListener('click', () => this.handleShow())
    })

    Array.from(elements.hideOkTrigger).forEach((hideTrigger) => {
      hideTrigger.addEventListener('click', () => this.handleHideWithOk())
    })

    Array.from(elements.hideCancelTrigger).forEach((hideTrigger) => {
      hideTrigger.addEventListener('click', () => this.handleHideWithCancel())
    })
  }

  async handleShow() {
    const { elements, selectors } = this
    elements.body.classList.add(selectors.lockBody)
    elements.modalWrapper.classList.add(selectors.showState)
    elements.mainContents.classList.add(selectors.blurState)
    await this.fadeIn()
  }

  async handleHide() {
    const { elements, selectors } = this
    this.fadeOut()
    await new Promise((resolve) =>
      // opacity が 0 になってから display 等を変えるための setTimeout
      setTimeout(() => {
        elements.body.classList.remove(selectors.lockBody)
        elements.modalWrapper.classList.remove(selectors.showState)
        elements.mainContents.classList.remove(selectors.blurState)
        return resolve()
      }, this.config.afterFadeOut),
    )
  }

  /**
   * @description Ok で閉じる際に前後処理を適用させるための handleHide のラッパー
   */
  async handleHideWithOk() {
    await this.handleHide()
  }

  /**
   * @description Cancel で閉じる際に前後処理を適用させるための handleHide のラッパー
   */
  async handleHideWithCancel() {
    await this.handleHide()
  }

  private async fadeIn() {
    const { elements, selectors } = this
    // modalWrapper の display が完全に変わった後に実行させるための setTimeout
    await new Promise((resolve) =>
      setTimeout(() => {
        elements.modalWrapper.classList.add(selectors.fadeState)
        return resolve()
      }, this.config.beforeFadeIn),
    )
  }

  private fadeOut() {
    const { elements, selectors } = this
    elements.modalWrapper.classList.remove(selectors.fadeState)
  }
}
