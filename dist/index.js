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
  const openDialog = (dialog) => {
    if (!dialog || typeof dialog !== "object") {
      return console.error("Element is not a dialog element");
    }
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) {
        dialog.showModal();
      }
      return;
    }
    if ("open" in dialog) {
      dialog.open = true;
      return;
    }
    console.error("Element is not a dialog element");
  };
  const closeDialog = (dialog) => {
    if (!dialog || typeof dialog !== "object") {
      return console.error("Element is not a dialog element");
    }
    if (typeof dialog.close === "function") {
      if (dialog.open) {
        dialog.close();
      }
      return;
    }
    if ("open" in dialog) {
      dialog.open = false;
      return;
    }
    console.error("Element is not a dialog element");
  };
  document.querySelectorAll(buttonSelector).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const dialogId = button.getAttribute("aria-controls");
      if (!dialogId) {
        return console.error("aria-controls attribute is missing");
      }
      const element = document.getElementById(dialogId) || document.querySelector("[role=dialog]");
      if (element) {
        openDialog(element);
      } else {
        console.error("Dialog not found");
      }
    });
  });
  document.querySelectorAll("dialog [formmethod=dialog]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const dialog = button.closest("dialog");
      if (dialog) {
        closeDialog(dialog);
      }
    });
  });
};
document.addEventListener("DOMContentLoaded", () => {
  initFixedHeader();
  initModalBindings();
});
