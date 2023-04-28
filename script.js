'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav__link');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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

/////////////////////////////
//Page navigation

//Scrolling
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  //scroling
  section1.scrollIntoView({ block: 'start', behavior: 'smooth' });
});
/*
navLinks.forEach(function (e) {
  e.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document
      .querySelector(id)
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
  });
});
*/

//event delegation
//1. add event listener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document
      .querySelector(id)
      .scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
});

//tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //guard clause (modern way)
  if (!clicked) return;
  //if (clicked) {} // traditional way
  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//menu fade animation
const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
//Intersection observer API
/*
const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

// old not efficient
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll', function (e) {
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

//Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//Carousel
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const maxSlide = slides.length - 1;
  let curSlide = 0;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //make is slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`) //-100%, 0%, 100%, 200%
    );
  };

  //next slide
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide(curSlide);
    if (e.key === 'ArrowRight') nextSlide(curSlide);
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
