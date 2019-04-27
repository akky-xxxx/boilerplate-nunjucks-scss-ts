import ModalBase from '../../modules/ModalBase'
import Loader from '../../modules/Loader'

const loader = Loader()

export default class Modal extends ModalBase {
  async handleHideWithOk() {
    await loader.handleShow()
    await new Promise((resolve) =>
      setTimeout(async () => {
        await loader.handleHide()
        await super.handleHideWithOk()
        return resolve()
      }, 1000),
    )
  }
}
