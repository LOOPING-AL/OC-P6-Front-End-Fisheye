import domElements from '../dom-elements.js';

export function displayModalForm() {
  domElements.modal.style.display = 'block';
}

export function closeModalForm() {
  domElements.modal.style.display = 'none';
}

export function closeDialogLightox() {
  domElements.lightBox.style.display = 'none';
}
