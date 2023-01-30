import { closeModal, displayModal } from "../utils/contactForm.js";
import { photographerPage } from "../factories/photographer.js";
import { domElements } from "../domElements/domElements.js";
import { useFilter } from "../utils/filter.js";
import { getPhotographer, getPhotographerSImages } from "../factories/query.js";

domElements.close.addEventListener("click", () => closeModal());
domElements.open.addEventListener("click", () => displayModal());
domElements.filterChoices.addEventListener("click", (e) => useFilter(e));
domElements.filterChoices.addEventListener("keydown", (e) => useFilter(e));

async function displayData(photographer) {
  const { images } = await getPhotographerSImages(photographer);
  const photographerModel = photographerPage(photographer, images);
  const getHeaderLeft = photographerModel.getHeaderLeft();
  domElements.contact_button?.parentNode.insertBefore(
    getHeaderLeft,
    domElements.contact_button
  );
  const getHeaderRight = photographerModel.getHeaderRight();
  domElements.contact_button?.after(getHeaderRight);
  const getAllImages = photographerModel.getAllImages();
  domElements.filter?.after(getAllImages);
}

async function init() {
  // Récupère les datas du photographe

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  const { photographer } = await getPhotographer(id);
  displayData(photographer);
}

init();
