import domElements from '../domElements.js';
import { photographerPage } from '../factories/photographer.js';

function useFilter(e, photographer, images) {
  const choices = ['Popularité', 'Date', 'Titre'];
  if (
    domElements.filterChoices?.childElementCount === 1 &&
    (e.type === 'click' || e.key === 'Enter')
  ) {
    domElements.filterIcon?.classList.add('open');
    let tabCounter = 3;

    choices.forEach((choice, id) => {
      if (choice !== domElements.filterChoices.children[0].outerText) {
        const separation = document.createElement('div');
        separation.classList.add('filter-choices-separation');
        separation.id = 'choice';

        const div = document.createElement('div');
        div.classList.add('filter-choices-choice');
        div.setAttribute('name', choice);
        div.setAttribute('role', 'option');
        div.setAttribute('tabIndex', tabCounter);
        div.id = 'choice';
        div.textContent = choices[id];

        domElements.filterChoices.appendChild(separation);
        domElements.filterChoices.appendChild(div);
        tabCounter += 1;
      }
    });
    return;
  }

  if (choices.includes(e.target.textContent) && e.key !== 'Tab') {
    domElements.filterIcon?.classList.remove('open');
    domElements.theChoice.innerHTML = e.target.textContent;

    const allImages = document.querySelector('.images');
    allImages.remove();

    const photographerModel = photographerPage(photographer, images);
    const getAllImages = photographerModel.getAllImages();
    domElements.filter?.after(getAllImages);

    document.querySelectorAll('#choice').forEach((choice) => {
      choice.style.animationName = 'disappear-animate';
    });

    setTimeout(() => {
      while (domElements.filterChoices?.children.length > 1)
        domElements.filterChoices?.children[1].remove();
    }, 200);
  }
}
export default useFilter;
