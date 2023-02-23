import domElements from '../dom-elements.js';

function useFilter(e) {
  const choices = ['Popularité', 'Date', 'Titre'];
  if (
    domElements.filterChoices?.childElementCount === 1 &&
    (e.type === 'click' || e.key === 'Enter')
  ) {
    domElements.filterIcon?.classList.add('open');
    let tabCounter = 9;

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
  if (
    e.key === 'Escape' ||
    (e.type === 'focusout' && e.target.tabIndex === 10)
  ) {
    document.querySelectorAll('#choice').forEach((choice) => {
      const thisChoice = choice;
      thisChoice.style.animationName = 'disappear-animate';
    });

    setTimeout(() => {
      while (domElements.filterChoices?.children.length > 1)
        domElements.filterChoices?.children[1].remove();
    }, 200);
  }
  if (
    choices.includes(e.target.textContent) &&
    e.type !== 'focusout' &&
    e.key !== 'Tab'
  ) {
    domElements.filterIcon?.classList.remove('open');
    domElements.theChoice.innerHTML = e.target.textContent;

    const images = document.querySelector('.images');
    const allImages = images.childNodes;

    const imagesArr = [];
    allImages.forEach((image) => {
      if (image.nodeType === 1) {
        imagesArr.push(image);
      }
    });

    imagesArr.sort((a, b) => {
      const theChoice = domElements.theChoice.innerHTML;
      if (theChoice === 'Popularité') {
        return Number(b.childNodes[1].childNodes[1].innerText) >
          Number(a.childNodes[1].childNodes[1].innerText)
          ? 1
          : -1;
      }
      if (theChoice === 'Date') {
        return b.dataset.date < a.dataset.date ? 1 : -1;
      }
      return a.childNodes[0].attributes.alt.value >
        b.childNodes[0].attributes.alt.value
        ? 1
        : -1;
    });
    let tabCounter = 11;

    imagesArr.forEach((image) => {
      tabCounter += 1;
      image.childNodes[0].setAttribute('tabIndex', tabCounter);
      images.appendChild(image);
    });

    document.querySelectorAll('#choice').forEach((choice) => {
      const thisChoice = choice;
      thisChoice.style.animationName = 'disappear-animate';
    });

    setTimeout(() => {
      while (domElements.filterChoices?.children.length > 1)
        domElements.filterChoices?.children[1].remove();
    }, 200);
  }
}

export default useFilter;
