
import { default as galleryItems } from './gallery-items.js';
'use strick';

const galleryRef = document.querySelector('.js-gallery');

// создатель 'li'
const item = (elem) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');
  return galleryItem;
}

// создатель 'a'
const link = (elem) => {
  const galleryLink = document.createElement('a');
  galleryLink.href = `${elem.original}`;
  galleryLink.classList.add('gallery__link');
  return galleryLink;
}

// создатель 'img'
const image = (elem) => {
  const galleryImage = document.createElement('img');
  galleryImage.dataset.source = `${elem.original}`;
  galleryImage.src = `${elem.preview}`;
  galleryImage.alt = `${elem.description}`;
  galleryImage.classList.add('gallery__image');
  return galleryImage;
}

//создаем разметку
const arrayItems = galleryItems.map(value => item(value));
const arrayLinks = galleryItems.map(value => link(value));
const arrayImages = galleryItems.map(value => image(value));
arrayLinks.forEach((elem, indx) => elem.appendChild(arrayImages[indx]));
arrayItems.forEach((elem, indx) => elem.appendChild(arrayLinks[indx]));

galleryRef.append(...arrayItems);

const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImageRef = document.querySelector('.lightbox__image');
const buttonCloseRef = document.querySelector('.lightbox__button[data-action="close-lightbox"]');

//открытие модалки
let target; //активная картинка
function handleGalleryClick(event) {
  event.preventDefault();
  target = event.target;
  if (target.nodeName !== 'IMG') return;
  lightboxImageRef.src = target.dataset.source;
  lightboxImageRef.alt = target.alt;
  lightboxRef.classList.add('is-open');
}

//закрытие модалки
function closeLightbox() {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
  target = '';
}

//слушатель событий на 'ul'
galleryRef.addEventListener('click', handleGalleryClick);

//слушатель событий на 'button'
buttonCloseRef.addEventListener('click', closeLightbox);

//слушатель событий на 'overlay'
lightboxRef.firstElementChild.addEventListener('click', closeLightbox);

//слушатель событий на 'Escape'
document.addEventListener('keydown', event => {
  if (lightboxRef.classList.contains('is-open')) {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  }
});

//меняем активную картинку на следуующию
function nextImage() {
  target = target.parentNode;
  target = target.parentNode;
  if (target.nextElementSibling === null) {
    target = target.parentNode;
    target = target.firstElementChild;
  }
  else {
    target = target.nextElementSibling
  };
  target = target.firstElementChild;
  target = target.firstElementChild;
  lightboxImageRef.src = target.dataset.source;
  lightboxImageRef.alt = target.alt;
}

//меняем активную картинку на предидущую
function prevImage() {
  target = target.parentNode;
  target = target.parentNode;
  if (target.previousElementSibling === null) {
    target = target.parentNode;
    target = target.lastElementChild;
  }
  else {
    target = target.previousElementSibling
  };
  target = target.firstElementChild;
  target = target.firstElementChild;
  lightboxImageRef.src = target.dataset.source;
  lightboxImageRef.alt = target.alt;
}

//слушатель событий на 'стрелку вправо'
document.addEventListener('keydown', event => {
  if (lightboxRef.classList.contains('is-open')) {
    if (event.key === 'ArrowRight') {
      nextImage();
    }
  }
});

//слушатель событий на 'стрелку влево'
document.addEventListener('keydown', event => {
  if (lightboxRef.classList.contains('is-open')) {
    if (event.key === 'ArrowLeft') {
      prevImage();
    }
  }
});

