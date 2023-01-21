import { closeModal, displayModal } from "../utils/contactForm.js";
import { photographerPage } from "../factories/photographer.js";

const close = document.getElementById("close");
const open = document.getElementById("open");

close.addEventListener("click", () => closeModal());
open.addEventListener("click", () => displayModal());

async function getPhotographer(id) {
  var photographer;
  await fetch("../../assets/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographer = data.photographers.find(
        (photographer) => photographer.id == id
      );
    });
  return {
    photographer,
  };
}

async function displayData(photographer) {
  const contact_button = document.querySelector(".contact_button");

  const photographerModel = photographerPage(photographer);
  const getHeaderLeft = photographerModel.getHeaderLeft();
  contact_button?.parentNode.insertBefore(getHeaderLeft, contact_button);
  const getHeaderRight = photographerModel.getHeaderRight();
  contact_button?.after(getHeaderRight);
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
