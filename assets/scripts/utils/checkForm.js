import domElements from '../domElements.js';
import { closeModal } from './contactForm.js';

function reinitialisation() {
  closeModal();
  domElements.formInputFirst.value = '';
  domElements.formInputLast.value = '';
  domElements.formInputEmail.value = '';
  domElements.formInputMessage.value = '';
}

export function validate(event) {
  if (testAllInput()) {
    reinitialisation();
  }
  event.preventDefault();
}

function testAllInput() {
  let allTestIsGood = true;
  if (
    !testName(domElements.formInputFirst, domElements.formErrorMessageFirst)
  ) {
    allTestIsGood = false;
  }
  if (!testName(domElements.formInputLast, domElements.formErrorMessageLast)) {
    allTestIsGood = false;
  }
  if (
    !testEmail(domElements.formInputEmail, domElements.formErrorMessageEmail)
  ) {
    allTestIsGood = false;
  }
  if (
    !testMessage(
      domElements.formInputMessage,
      domElements.formErrorMessageMessage
    )
  ) {
    allTestIsGood = false;
  }

  return allTestIsGood;
}

export function testName(formInput, formErrorMessage) {
  let message = '';

  formInput.setAttribute('aria-invalid', false);
  if (!/(^[A-ZÀ-Þ][A-ZÀ-Þa-z '-]{1,})+/g.test(formInput.value)) {
    message = 'Veuillez entrer';
    formInput.setAttribute('aria-invalid', true);
    if (!/^[A-ZÀ-Þ]+/g.test(formInput.value)) {
      message = message + ', une majuscule pour commencer';
    }
    if (!/.{2,}/g.test(formInput.value)) {
      message = message + ', 2 caractères ou plus';
    }
    if (/[^A-ZÀ-Þ-a-z '-]/g.test(formInput.value)) {
      message = message + ", que ces caractères spéciaux ('-)";
    }
    message += ' pour ce champ.';
  }
  formErrorMessage.innerHTML = message;
  isEmpty(formInput, formErrorMessage);
  if (formInput.getAttribute('aria-invalid') === 'false') {
    return true;
  }
  return false;
}

export function testEmail(formInput, formErrorMessage) {
  let message = '';
  formInput.setAttribute('aria-invalid', false);
  if (!/^[\w-\.]+@([\w-+]+\.)+[\w-]{2,4}$/g.test(formInput.value)) {
    formInput.setAttribute('aria-invalid', true);
    message = "L'adresse mail n'est pas correct elle doit suivre `abc@abc.abc`";
  }
  formErrorMessage.innerHTML = message;
  isEmpty(formInput, formErrorMessage);
  if (formInput.getAttribute('aria-invalid') === 'false') {
    return true;
  }
  return false;
}

export function testMessage(formInput, formErrorMessage) {
  isEmpty(formInput, formErrorMessage);
  if (formInput.getAttribute('aria-invalid') === 'false') {
    return true;
  }
  return false;
}

function isEmpty(formInput, formErrorMessage) {
  if (formInput.value === '') {
    formInput.setAttribute('aria-invalid', true);
    formErrorMessage.innerHTML = 'Le champs est obligatoire.';
  }
}
