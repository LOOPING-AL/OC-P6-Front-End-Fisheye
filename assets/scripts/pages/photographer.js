import domElements from '../domElements.js';
import { photographerPage } from '../factories/photographer.js';
import { getPhotographer, getPhotographerSImages } from '../factories/query.js';
import { closeModal, displayModal } from '../utils/contactForm.js';
import { useFilter } from '../utils/filter.js';

domElements.close.addEventListener('click', () => closeModal());
domElements.open.addEventListener('click', () => displayModal());
domElements.filterChoices.addEventListener('click', (e) => useFilter(e));
domElements.filterChoices.addEventListener('keydown', (e) => useFilter(e));

async function displayData(photographer) {
  const { images } = await getPhotographerSImages(photographer);
  const photographerModel = photographerPage(photographer, images);
  const name = photographerModel.getPhotographerName();
  const getHeaderLeft = photographerModel.getHeaderLeft();
  const getHeaderRight = photographerModel.getHeaderRight();
  const getAllImages = photographerModel.getAllImages();

  domElements.title.innerHTML = 'Fisheye - ' + name;
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
