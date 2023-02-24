const domElements = {
  photographersSection: document.querySelector('.photographer_section'),
  title: document.querySelector('title'),
  contact_button: document.querySelector('.contact_button'),
  close: document.getElementById('close'),
  open: document.getElementById('open'),
  modal: document.getElementById('contact_modal'),
  modalTitle: document.querySelector('.modal-title'),
  filter: document.querySelector('.filter'),
  filterChoices: document.querySelector('.filter-choices'),
  filterChoice: document.querySelectorAll('.filter-choices-choice'),
  filterIcon: document.querySelector('.filter-icon'),
  first: document.querySelector('.filter-first'),
  theChoice: document.querySelector('.theChoice'),
  form: document.getElementById('formAll'),
  formInputFirst: document.getElementById('First name'),
  formErrorMessageFirst: document.querySelector('#errfirst'),
  formInputLast: document.getElementById('Last name'),
  formErrorMessageLast: document.querySelector('#errlast'),
  formInputEmail: document.querySelector('#email'),
  formErrorMessageEmail: document.querySelector('#erremail'),
  formInputMessage: document.getElementById('Your message'),
  formErrorMessageMessage: document.querySelector('#errmessage'),
  images: document.querySelector('.images'),
  stickyInfo: document.querySelector('.stickyInfo'),
  stickyInfoAllLikes: document.querySelector('.allLikes'),
  stickyInfoPrice: document.querySelector('.price'),
  lightBox: document.querySelector('.lightBox'),
  lightBoxImg: document.querySelector('.lightBox-img'),
  lightBoxVideo: document.querySelector('.lightBox-video'),
  lightBoxClose: document.querySelector('.lightBox-close'),
  lightBoxDirection: document.querySelectorAll('.lightBox-direction'),
};

export default domElements;
