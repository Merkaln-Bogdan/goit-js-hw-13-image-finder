import imageservice from './api/servicePixabayApi';
import templateImage from './templateImageItem.hbs';
import * as basicLightbox from 'basiclightbox';
const refs = {
  searchForm: document.querySelector('#search-form'),
  gelleryList: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('button[data-action="load more"]'),
};

refs.buttonLoadMore.addEventListener('click', loadMoreButtonFunc);
refs.searchForm.addEventListener('submit', searchFormSubmit);
refs.gelleryList.addEventListener('click', openModalWindow);
function searchFormSubmit(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.query.value;

  clearListImage();
  imageservice.resetPage();
  imageservice.searchQuery = inputValue;
  imageservice.fetchImage().then(hits => {
    const markup = buildListImage(hits);
    insertListImage(markup);
  });
}

function insertListImage(imageItems) {
  refs.gelleryList.insertAdjacentHTML('beforeend', imageItems);
}

function loadMoreButtonFunc() {
  imageservice.fetchImage().then(hits => {
    const markup = buildListImage(hits);
    insertListImage(markup);
  });
}

function buildListImage(items) {
  return templateImage(items);
}
function clearListImage() {
  refs.gelleryList.innerHTML = '';
}

function openModalWindow(e) {
  if (e.target.localName === 'img') {
    const srcImage = e.target.dataset.largesrc;
    basicLightbox
      .create(
        `
      <img src="${srcImage}" width="800" height="600">
  `,
      )
      .show();
  }
}
