import domElements from '../dom-elements.js';
import { getVideoOrImgInLightBox } from '../utils/light-box.js';

export function photographerFactory(data, i) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/images/SamplePhotos/PhotographersID/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const link = document.createElement('a');
    link.setAttribute('tabindex', i);
    link.setAttribute('aria-label', name);
    const params = new URLSearchParams({ id });
    link.href = `/pages/photographer.html?${params}`;

    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;

    const h4 = document.createElement('h4');
    h4.textContent = tagline;

    const h5 = document.createElement('h5');
    h5.textContent = `${price} €/jour`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(h4);
    article.appendChild(h5);

    return article;
  }

  return { name, picture, getUserCardDOM };
}

export function photographerPage(photographer, images) {
  const { name, portrait, city, country, tagline, price } = photographer;

  const picturePhotograph = `../../assets/images/SamplePhotos/PhotographersID/${portrait}`;

  function getPhotographerName() {
    return name;
  }

  function getHeaderLeft() {
    const div = document.createElement('div');

    const h2 = document.createElement('h2');
    h2.textContent = name;

    const h3 = document.createElement('h3');
    h3.textContent = `${city}, ${country}`;

    const h4 = document.createElement('h4');
    h4.textContent = tagline;

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(h4);

    return div;
  }

  function getHeaderRight() {
    const img = document.createElement('img');
    img.setAttribute('src', picturePhotograph);
    img.setAttribute('alt', name);

    return img;
  }

  function getAllImages() {
    const first = name.substring(0, name.lastIndexOf(' '));

    function sortByFilter(a, b) {
      const theChoice = domElements.theChoice.innerHTML;
      if (theChoice === 'Popularité') {
        return a.likes < b.likes ? 1 : -1;
      }
      if (theChoice === 'Date') {
        return b.date < a.date ? 1 : -1;
      }
      return b.title < a.title ? 1 : -1;
    }

    const newImagesSort = images.sort(sortByFilter);

    let tabCounter = 11;

    newImagesSort.forEach((image) => {
      const article = document.createElement('article');
      article.setAttribute('data-date', image.date);
      const src = `../../assets/images/SamplePhotos/${first}/${
        image.image ? image.image : image.video
      }`;

      let img;

      if (image.image) {
        img = document.createElement('img');
        img.setAttribute('src', src);
        img.setAttribute('alt', image.title);
      } else if (image.video) {
        img = document.createElement('video');
        const source = document.createElement('source');
        source.setAttribute('src', src);

        img.setAttribute('alt', image.title);
        img.appendChild(source);

        const icon = document.createElement('img');
        icon.setAttribute('src', '../../assets/images/icons/play.svg');
        icon.setAttribute('alt', 'icon play');
        icon.classList = 'icon-play';
        article.appendChild(icon);
      }

      img.setAttribute('id', 'image');
      img.setAttribute('tabindex', tabCounter);
      img.classList = 'photographImage';

      const div = document.createElement('div');
      const title = document.createElement('h5');

      title.textContent = image.title;

      const divLikes = document.createElement('div');
      divLikes.classList = 'divLikes';

      const likes = document.createElement('h5');
      likes.textContent = image.likes;

      tabCounter += 1;
      const like = document.createElement('img');

      like.setAttribute('src', '../../assets/images/icons/like.svg');
      like.setAttribute('alt', 'like');
      like.setAttribute('tabindex', tabCounter);
      like.classList = 'like';

      div.appendChild(title);
      divLikes.appendChild(likes);
      divLikes.appendChild(like);
      div.appendChild(divLikes);
      article.appendChild(img);
      article.appendChild(div);
      domElements.images.appendChild(article);

      tabCounter += 1;
    });
  }

  function getStickyInfo() {
    let likes = 0;

    images.forEach((image) => {
      likes += image.likes;
    });
    const divLikes = document.createElement('div');
    divLikes.id = 'numberOfLikes';
    divLikes.textContent = likes;

    domElements.stickyInfoAllLikes?.parentNode.insertBefore(
      divLikes,
      domElements.stickyInfoAllLikes
    );

    const divPrice = document.createElement('div');
    divPrice.textContent = price;

    domElements.stickyInfoPrice.parentNode.insertBefore(
      divPrice,
      domElements.stickyInfoPrice
    );
  }

  return {
    getPhotographerName,
    getHeaderLeft,
    getHeaderRight,
    getAllImages,
    getStickyInfo,
  };
}

export function clickOnImages(e) {
  const images = document.querySelector('.images');
  const lastTabIndexOfImages =
    images.lastElementChild.lastElementChild.lastElementChild.lastElementChild
      .tabIndex;
  domElements.lightBoxClose.setAttribute('tabindex', lastTabIndexOfImages + 1);
  domElements.lightBoxClose.focus();
  domElements.lightBoxDirection[0].setAttribute(
    'tabindex',
    lastTabIndexOfImages + 2
  );
  domElements.lightBoxDirection[1].setAttribute(
    'tabindex',
    lastTabIndexOfImages + 4
  );

  if (
    e.target.className === 'photographImage' &&
    (e.key === 'Enter' || e.type === 'click')
  ) {
    domElements.lightBox.style.display = 'flex';
    getVideoOrImgInLightBox(e.srcElement.currentSrc, lastTabIndexOfImages + 3);
  }

  if (
    e.target.className.includes('like') &&
    e.key !== 'Tab' &&
    e.key !== 'Shift'
  ) {
    const likes = e.target.parentElement.childNodes[0];
    const allLikes = document.getElementById('numberOfLikes');

    if (likes.getAttribute('increment') === 'true') {
      allLikes.textContent = Number(allLikes.textContent) - 1;
      e.target.classList.remove('like-show');
      likes.textContent = Number(e.target.parentElement.innerText) - 1;
      likes.setAttribute('increment', false);
      return;
    }

    allLikes.textContent = Number(allLikes.textContent) + 1;
    likes.setAttribute('increment', true);
    likes.textContent = Number(e.target.parentElement.innerText) + 1;
    e.target.classList.add('like-show');
  }
}
