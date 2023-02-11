import domElements from '../dom-elements.js';

export function getVideoOrImgInLightBox(src) {
  const { lightBoxImg: lightBoxImgH } = domElements;
  const { lightBoxVideo: lightBoxVideoH } = domElements;
  if (/.*\.mp4$/.test(src)) {
    lightBoxImgH.style.display = 'none';
    lightBoxVideoH.style.display = 'block';
    lightBoxVideoH.alt = src.replace(/^.*\/(.*?)\.[^.]+$/, '$1');
    lightBoxVideoH.childNodes[1].src = src;
    lightBoxVideoH.load();
    return;
  }
  lightBoxImgH.style.display = 'block';
  lightBoxVideoH.style.display = 'none';
  lightBoxImgH.src = src;
  lightBoxImgH.alt = src.replace(/^.*\/(.*?)\.[^.]+$/, '$1');
}

export function lightBoxNavigation(e) {
  const { lightBoxImg: lightBoxImgH } = domElements;
  const { lightBoxVideo: lightBoxVideoH } = domElements;
  const isImg =
    lightBoxImgH.style.display === 'block' || lightBoxImgH.style.display === '';

  function getAllImagesSrc() {
    const images = document.querySelector('.images');
    const allImages = images.childNodes;
    const imagesArr = [];
    allImages.forEach((image) => {
      if (image.nodeType === 1) {
        imagesArr.push(image.childNodes[0].currentSrc);
      }
    });
    return imagesArr;
  }

  const allImagesSrc = getAllImagesSrc();
  const index = allImagesSrc.findIndex((imageSrc) =>
    isImg
      ? imageSrc === lightBoxImgH.src
      : imageSrc === lightBoxVideoH.childNodes[1].src
  );

  if (e.target.alt === 'right') {
    if (index === allImagesSrc.length - 1) {
      getVideoOrImgInLightBox(allImagesSrc[0]);
      return;
    }
    getVideoOrImgInLightBox(allImagesSrc[index + 1]);
    return;
  }

  if (index === 0) {
    getVideoOrImgInLightBox(allImagesSrc[allImagesSrc.length - 1]);
    return;
  }
  getVideoOrImgInLightBox(allImagesSrc[index - 1]);
}
