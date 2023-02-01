export async function getPhotographers() {
  let photographers;
  await fetch('../../assets/data/photographers.json')
    .then((response) => response.json())
    .then((data) => {
      photographers = data.photographers;
    });
  return {
    photographers,
  };
}

export async function getPhotographer(id) {
  let photographer;
  await fetch('../../assets/data/photographers.json')
    .then((response) => response.json())
    .then((data) => {
      photographer = data.photographers.find(
        (photographer) => photographer.id === parseInt(id)
      );
    });
  return {
    photographer,
  };
}

export async function getPhotographerSImages(photographer) {
  let images;
  await fetch('../../assets/data/photographers.json')
    .then((response) => response.json())
    .then((data) => {
      images = data.media.filter(
        (image) => image.photographerId == photographer.id
      );
    });
  return {
    images: images,
  };
}
