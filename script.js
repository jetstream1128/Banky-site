'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  //scroling
  section1.scrollIntoView({ block: 'start', behavior: 'smooth' });
  /*
 console.log(s1coords);

  console.log(e.target.getBoundingClientRect());
  console.log('Current scroll (x/y)', scrollX, scrollY);

console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  window.scrollTo(s1coords.left, s1coords.top + scrollY + 80);
  window.scrollTo({
    left: s1coords.left,
    top: s1coords.top + scrollY + 80,
    behavior: 'smooth',
  });
*/
});

/////////////////////////////////////////////////////////////////////////
//#region ------ Lecture 186 Selecting, creating, deleting elements -----
/*
//Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); //Select 1 class element
const allSections = document.querySelectorAll('.section'); //select all elements with this class
console.log(allSections);

document.getElementById('section--1'); // select element with matching #ID
const allButtons = document.getElementsByTagName('button'); // returns live HTML collection
console.log(allButtons);

document.getElementsByClassName('btn'); // returns live HTML collection

//creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

//Delete elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', () => message.remove()); //message.parentElement.removeChild(message); // DOM traversing
*/
//#endregion

//#region ------ Lecture 187 styles, attributes and classes -----
/*
//styles
message.style.backgroundColor = '#37383d';
message.style.width = '100vw';

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');

//attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);

console.log(logo.className);
console.log(logo.classList);

logo.alt = 'beautiful minimalist logo';

//non-standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//data attributes
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); //true

// dont use this
logo.className = 'jay';
*/
//#endregion

//#region ------ Lecture 189 Types of events -----

const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', function (e) {
  alert('AddEventListener: Great! you are reading the heading :D');
});

//#endregion
