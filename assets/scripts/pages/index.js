import domElements from '../dom-elements.js';
import { getPhotographers } from '../factories/api-client.js';
import { photographerFactory } from '../factories/photographer.js';

async function displayData(photographers) {
  let i = 1;

  photographers.forEach((photographer) => {
    i = +i;
    const photographerModel = photographerFactory(photographer, i);
    const userCardDOM = photographerModel.getUserCardDOM();

    domElements.photographersSection?.appendChild(userCardDOM);
  });
}

async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
