import domElements from '../domElements.js';
import { photographerPage } from '../factories/photographer.js';
import { getPhotographer, getPhotographerSImages } from '../factories/query.js';
import { closeModal, displayModal } from '../utils/contactForm.js';
import { useFilter } from '../utils/filter.js';
import {
  validate,
  testName,
  testEmail,
  testMessage,
} from '../utils/checkForm.js';

domElements.close.addEventListener('click', () => closeModal());
domElements.open.addEventListener('click', () => displayModal());
domElements.filterChoices.addEventListener('click', (e) => useFilter(e));
domElements.filterChoices.addEventListener('keydown', (e) => useFilter(e));
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

async function displayData(photographer) {
  const { images } = await getPhotographerSImages(photographer);
  const photographerModel = photographerPage(photographer, images);
  const name = photographerModel.getPhotographerName();
  const getHeaderLeft = photographerModel.getHeaderLeft();
  const getHeaderRight = photographerModel.getHeaderRight();
  const getAllImages = photographerModel.getAllImages();

  domElements.title.innerHTML = 'Fisheye - ' + name;
  domElements.modalTitle.innerHTML = `${domElements.modalTitle.innerHTML} ${name}`;
  domElements.contact_button?.parentNode.insertBefore(
    getHeaderLeft,
    domElements.contact_button
  );
  domElements.contact_button?.after(getHeaderRight);
  domElements.filter?.after(getAllImages);
}

async function init() {
  // Récupère les datas du photographe

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const { photographer } = await getPhotographer(id);
  displayData(photographer);
}

init();
