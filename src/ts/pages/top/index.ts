import ModalBase from '../../modules/ModalBase'
import Modal from './Modal'

const dialog = new ModalBase({
  elements: {
    showTrigger: document.querySelectorAll('.js-dialog-open'),
    hideOkTrigger: document.querySelectorAll('.js-dialog-close-ok'),
    hideCancelTrigger: document.querySelectorAll('.js-dialog-close-cancel'),
    modalWrapper: <HTMLElement>document.querySelector('.js-dialog-wrapper'),
  },
})

const modal1 = new Modal({
  elements: {
    showTrigger: document.querySelectorAll('.js-modal-open'),
    hideOkTrigger: document.querySelectorAll('.js-modal-close-ok'),
    hideCancelTrigger: document.querySelectorAll('.js-modal-close-cancel'),
    modalWrapper: <HTMLElement>document.querySelector('.js-modal-wrapper'),
  },
})

const modal2 = new Modal({
  elements: {
    showTrigger: document.querySelectorAll('.js-modal2-open'),
    hideOkTrigger: document.querySelectorAll('.js-modal2-close-ok'),
    hideCancelTrigger: document.querySelectorAll('.js-modal2-close-cancel'),
    modalWrapper: <HTMLElement>document.querySelector('.js-modal2-wrapper'),
  },
})

dialog.bindAddEventListener()
modal1.bindAddEventListener()
modal2.bindAddEventListener()
