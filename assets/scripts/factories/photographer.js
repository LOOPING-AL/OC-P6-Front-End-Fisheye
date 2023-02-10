import domElements from '../dom-elements.js';

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

    const render = document.createElement('div');
    render.classList = 'images';

    let tabCounter = 5;

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
      }

      img.setAttribute('tabindex', tabCounter);
      img.classList = 'photographImage';

      const div = document.createElement('div');
      const title = document.createElement('h5');
      title.textContent = image.title;

      const divLikes = document.createElement('div');
      divLikes.classList = 'divLikes';

      const likes = document.createElement('h5');
      likes.textContent = image.likes;

      const like = document.createElement('img');
      like.setAttribute('src', '../../assets/images/icons/like.svg');
      like.setAttribute('alt', 'like');
      like.classList = 'like';

      div.appendChild(title);
      divLikes.appendChild(likes);
      divLikes.appendChild(like);
      div.appendChild(divLikes);
      article.appendChild(img);
      article.appendChild(div);
      render.appendChild(article);
      tabCounter += 1;
    });

    return render;
  }

  function getStickyInfo() {
    let likes = 0;

    images.forEach((image) => {
      likes += image.likes;
    });
    const divLikes = document.createElement('div');
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
