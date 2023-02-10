import domElements from '../dom-elements.js';
import { closeModal } from './contact-form.js';

function reinitialisation() {
  closeModal();
  domElements.formInputFirst.value = '';
  domElements.formInputLast.value = '';
  domElements.formInputEmail.value = '';
  domElements.formInputMessage.value = '';
}

function isEmpty(formInput, formErrorMessage) {
  const thisFormErrorMessageTest = formErrorMessage;

  if (formInput.value === '') {
    formInput.setAttribute('aria-invalid', true);
    thisFormErrorMessageTest.innerHTML = 'Le champs est obligatoire.';
  }
}

export function testName(formInput, formErrorMessage) {
  let message = '';
  const thisFormErrorMessageTest = formErrorMessage;

  formInput.setAttribute('aria-invalid', false);

  if (!/(^[A-ZÀ-Þ][A-ZÀ-Þa-z '-]{1,})+/g.test(formInput.value)) {
    message = 'Veuillez entrer';
    formInput.setAttribute('aria-invalid', true);
    if (!/^[A-ZÀ-Þ]+/g.test(formInput.value)) {
      message += ', une majuscule pour commencer';
    }
    if (!/.{2,}/g.test(formInput.value)) {
      message += ', 2 caractères ou plus';
    }
    if (/[^A-ZÀ-Þ-a-z '-]/g.test(formInput.value)) {
      message += ", que ces caractères spéciaux ('-)";
    }
    message += ' pour ce champ.';
  }

  thisFormErrorMessageTest.innerHTML = message;
  isEmpty(formInput, formErrorMessage);

  if (formInput.getAttribute('aria-invalid') === 'false') {
    return true;
  }
  return false;
}

export function testEmail(formInput, formErrorMessage) {
  let message = '';
  const thisFormErrorMessageTest = formErrorMessage;

  formInput.setAttribute('aria-invalid', false);

  if (!/^[\w-.]+@([\w-+]+\.)+[\w-]{2,4}$/g.test(formInput.value)) {
    formInput.setAttribute('aria-invalid', true);
    message = "L'adresse mail n'est pas correct elle doit suivre `abc@abc.abc`";
  }

  thisFormErrorMessageTest.innerHTML = message;
  isEmpty(formInput, formErrorMessage);

  if (formInput.getAttribute('aria-invalid') === 'false') {
    return true;
  }
  return false;
}

export function testMessage(formInput, formErrorMessage) {
  const message = '';
  const thisFormErrorMessageTest = formErrorMessage;

  formInput.setAttribute('aria-invalid', false);
  isEmpty(formInput, formErrorMessage);
  thisFormErrorMessageTest.innerHTML = message;

  if (formInput.getAttribute('aria-invalid') === 'false') {
    return true;
  }
  return false;
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

export function validate(event) {
  if (testAllInput()) {
    // eslint-disable-next-line no-console
    console.log({
      firstName: domElements.formInputFirst.value,
      lastName: domElements.formInputLast.value,
      email: domElements.formInputEmail.value,
      message: domElements.formInputMessage.value,
    });

    reinitialisation();
  }

  event.preventDefault();
}
