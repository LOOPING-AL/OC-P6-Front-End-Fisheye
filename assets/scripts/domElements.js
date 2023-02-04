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
  formInputFirst: document.querySelector('#first'),
  formErrorMessageFirst: document.querySelector('#errfirst'),
  formInputLast: document.querySelector('#last'),
  formErrorMessageLast: document.querySelector('#errlast'),
  formInputEmail: document.querySelector('#email'),
  formErrorMessageEmail: document.querySelector('#erremail'),
  formInputMessage: document.querySelector('#message'),
  formErrorMessageMessage: document.querySelector('#errmessage'),
  stickyInfo: document.querySelector('.stickyInfo'),
  stickyInfoFirst: document.querySelector('.stickyInfo-first'),
  stickyInfoAllLikes: document.querySelector('.allLikes'),
};

export default domElements;
