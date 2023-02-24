import domElements from '../dom-elements.js';

export function displayModalForm() {
  domElements.modal.style.display = 'block';
  domElements.formInputFirst.focus();
}

export function closeModalForm(e) {
  if (e === undefined || e.key === 'Escape')
    domElements.modal.style.display = 'none';
}

export function closeDialogLightox() {
  domElements.lightBox.style.display = 'none';
}
