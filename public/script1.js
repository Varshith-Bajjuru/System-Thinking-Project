'use strict';

const slideContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slider-container .slide');
const btnleft = document.querySelector('.slider-controls .btn_left');
const btnright = document.querySelector('.slider-controls .btn_right');

let currentIndex = 0;
const translateSlide = function (index) {
  slides.forEach(s => (s.style.transform = `translateX(-${100 * index}%)`));
};

const showNextSlide = function () {
  currentIndex = (currentIndex + 1) % slides.length;
  translateSlide(currentIndex);
};

const showPreviousSlide = function () {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  translateSlide(currentIndex);
};
btnleft.addEventListener('click', showPreviousSlide);
btnright.addEventListener('click', showNextSlide);
translateSlide(currentIndex);
