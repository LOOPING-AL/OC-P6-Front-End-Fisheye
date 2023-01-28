import { domElements } from "../domElements/domElements.js";

export function displayModal() {
  domElements.modal.style.display = "block";
}

export function closeModal() {
  domElements.modal.style.display = "none";
}
