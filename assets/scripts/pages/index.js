import { photographerFactory } from "../factories/photographer.js";
import { domElements } from "../domElements/domElements.js";

async function getPhotographers() {
  var photographers;
  await fetch("../../assets/data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
      photographers = data.photographers;
    });
  return {
    photographers,
  };
}

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
