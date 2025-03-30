const initFixedHeader = () => {
  const container = document.body;
  const isPageScrolled = () => document.body.scrollTop > 0;
  container.addEventListener("scroll", () => {
    if (isPageScrolled()) {
      container.classList.add("scrolled");
      return;
    }
    container.classList.remove("scrolled");
  });
};
const initModalBindings = () => {
  const buttonSelector = "[aria-haspopup=dialog]";
  document.querySelectorAll(buttonSelector).forEach((button) => {
    button.addEventListener("click", () => {
      const dialogId = button.getAttribute("aria-controls");
      if (!dialogId) {
        return console.error("aria-controls attribute is missing");
      }
      const element = document.getElementById(dialogId) || document.querySelector("[role=dialog]");
      if (element) {
        if (element instanceof HTMLDialogElement) {
          element.showModal();
        } else {
          console.error("Element is not a dialog element");
        }
      } else {
        console.error("Dialog not found");
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", () => {
  initFixedHeader();
  initModalBindings();
});
