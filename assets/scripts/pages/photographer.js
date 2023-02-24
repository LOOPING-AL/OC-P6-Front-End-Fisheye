import domElements from '../dom-elements.js';
import {
  getPhotographer,
  getPhotographersImages,
} from '../factories/api-client.js';
import { clickOnImages, photographerPage } from '../factories/photographer.js';
import {
  testEmail,
  testMessage,
  testName,
  validate,
} from '../utils/check-form.js';
import useFilter from '../utils/filter.js';
import { lightBoxNavigation } from '../utils/light-box.js';
import {
  closeDialogLightox,
  closeModalForm,
  displayModalForm,
} from '../utils/modalDialog.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
const { photographer } = await getPhotographer(id);
const { images } = await getPhotographersImages(photographer);

domElements.close.addEventListener('click', () => closeModalForm());
domElements.open.addEventListener('click', () => displayModalForm());
domElements.modal.addEventListener('keyup', (e) => closeModalForm(e));
domElements.filterChoices.addEventListener('click', (e) =>
  useFilter(e, photographer, images)
);
domElements.filterChoices.addEventListener('keydown', (e) => useFilter(e));
domElements.filterChoices.addEventListener('Escape', (e) => useFilter(e));
domElements.filter.addEventListener('focusout', (e) => useFilter(e));

domElements.form.addEventListener('submit', (e) => validate(e));
domElements.formInputFirst?.addEventListener('focusout', () =>
  testName(domElements.formInputFirst, domElements.formErrorMessageFirst)
);
domElements.formInputLast.addEventListener('focusout', () =>
  testName(domElements.formInputLast, domElements.formErrorMessageLast)
);
domElements.formInputEmail.addEventListener('focusout', () =>
  testEmail(domElements.formInputEmail, domElements.formErrorMessageEmail)
);
domElements.formInputMessage?.addEventListener('focusout', () =>
  testMessage(domElements.formInputMessage, domElements.formErrorMessageMessage)
);

domElements.images.addEventListener('click', (e) => clickOnImages(e));
domElements.images.addEventListener('keydown', (e) => clickOnImages(e));

domElements.lightBoxClose.addEventListener('click', () => closeDialogLightox());

domElements.lightBoxDirection.forEach((direction) => {
  direction.addEventListener('click', (e) => lightBoxNavigation(e));
});
domElements.lightBox.addEventListener('keyup', (e) => lightBoxNavigation(e));

async function init() {
  const photographerModel = photographerPage(photographer, images);
  const name = photographerModel.getPhotographerName();
  const getHeaderLeft = photographerModel.getHeaderLeft();
  const getHeaderRight = photographerModel.getHeaderRight();
  photographerModel.getAllImages();
  photographerModel.getStickyInfo();

  domElements.title.innerHTML = `Fisheye - ${name}`;
  domElements.modalTitle.innerHTML = `${domElements.modalTitle.innerHTML} ${name}`;
  domElements.contact_button?.parentNode.insertBefore(
    getHeaderLeft,
    domElements.contact_button
  );
  domElements.modal.setAttribute('aria-label', `Contact me ${name}`);
  domElements.contact_button?.after(getHeaderRight);
}

init();
