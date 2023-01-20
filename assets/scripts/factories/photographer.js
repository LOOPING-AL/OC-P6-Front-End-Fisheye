export function photographerFactory(data, i) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/images/SamplePhotos/PhotographersID/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const link = document.createElement("a");
    link.setAttribute("tabindex", i);
    link.href = `assets/pages/photographer.html`;
    // link.href = `assets/pages/photographer.html?id="${name}"`;
    const h3 = document.createElement("h3");
    h3.textContent = `${city}, ${country}`;
    const h4 = document.createElement("h4");
    h4.textContent = tagline;
    const h5 = document.createElement("h5");
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
