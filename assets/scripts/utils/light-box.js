import domElements from '../dom-elements.js';
import { closeDialogLightox } from './modalDialog.js';

export function getVideoOrImgInLightBox(src, index) {
  const { lightBoxImg: lightBoxImgH } = domElements;
  const { lightBoxVideo: lightBoxVideoH } = domElements;
  if (index !== undefined) {
    lightBoxVideoH.setAttribute('tabindex', index);
    lightBoxImgH.setAttribute('tabindex', index);
  }
  if (/.*\.mp4$/.test(src)) {
    lightBoxImgH.style.display = 'none';
    lightBoxVideoH.style.display = 'block';
    lightBoxVideoH.alt = src.replace(/^.*\/(.*?)\.[^.]+$/, '$1');
    lightBoxVideoH.childNodes[1].src = src;
    lightBoxVideoH.setAttribute('aria-label', src);
    lightBoxVideoH.load();
    lightBoxVideoH.focus();
    return;
  }
  lightBoxImgH.style.display = 'block';
  lightBoxVideoH.style.display = 'none';
  lightBoxImgH.src = src;
  lightBoxImgH.focus();
  lightBoxImgH.alt = src.replace(/^.*\/(.*?)\.[^.]+$/, '$1');
}

export function lightBoxNavigation(e) {
  const { lightBoxImg: lightBoxImgH } = domElements;
  const { lightBoxVideo: lightBoxVideoH } = domElements;
  const isImg =
    lightBoxImgH.style.display === 'block' || lightBoxImgH.style.display === '';

  function getAllImagesSrc() {
    const images = document.querySelectorAll('#image');
    const imagesArr = [];
    images.forEach((image) => {
      if (image.nodeType === 1) {
        imagesArr.push(image.currentSrc);
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
  if (
    (e.target.alt === 'Next image' && e.key === 'Enter') ||
    e.key === 'ArrowRight'
  ) {
    if (index === allImagesSrc.length - 1) {
      getVideoOrImgInLightBox(allImagesSrc[0]);
      return;
    }
    getVideoOrImgInLightBox(allImagesSrc[index + 1]);
    return;
  }
  if (
    (e.target.alt === 'Close dialog' && e.key === 'Enter') ||
    e.key === 'Escape'
  ) {
    closeDialogLightox();
    return;
  }

  if (
    (e.target.alt === 'Previous image' && e.key === 'Enter') ||
    e.key === 'ArrowLeft'
  ) {
    if (index === 0) {
      getVideoOrImgInLightBox(allImagesSrc[allImagesSrc.length - 1]);
      return;
    }
    getVideoOrImgInLightBox(allImagesSrc[index - 1]);
  }
  if (e.key === ' ' && domElements.lightBoxVideo.style.display === 'block') {
    domElements.lightBoxVideo.play();
  }
}
