const initFixedHeader = () => {
  const container = document.body
  const isPageScrolled = () => document.body.scrollTop > 0

  container.addEventListener('scroll', () => {
    if (isPageScrolled()) {
      container.classList.add('scrolled')
      return
    }
    container.classList.remove('scrolled')
  })
}

const initModalBindings = () => {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal-target');
      const modal = document.querySelector(`dialog[data-modal-id="${modalId}"]`);
      
      if (modal instanceof HTMLDialogElement) {
        modal.showModal();
      } else {
        console.error(`Modal with data-modal-id="${modalId}" not found or is not a dialog element`);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFixedHeader();
  initModalBindings();
});
