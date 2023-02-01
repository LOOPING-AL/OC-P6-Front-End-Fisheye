import domElements from '../domElements.js';
import { photographerFactory } from '../factories/photographer.js';
import { getPhotographers } from '../factories/query.js';

async function displayData(photographers) {
  let i = 1;
  photographers.forEach((photographer) => {
    i++;
    const photographerModel = photographerFactory(photographer, i);
    const userCardDOM = photographerModel.getUserCardDOM();

    domElements.photographersSection?.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
