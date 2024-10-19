'use strict';
// sliding buttons
const slideContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slider-container .slide');
const btnleft = document.querySelector('.slider-controls .btn_left');
const btnright = document.querySelector('.slider-controls .btn_right');

// FAQs buttons
const FAQs = document.querySelectorAll('.FAQs-section');
const questions = document.querySelectorAll('.Question');

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

// FAQs events handling

// FAQs.addEventListener('click', function (event) {
//   const questionContainer = event.target.closest('.FAQs-section-container');

//   if (questionContainer) {
//     const answer = questionContainer.querySelector('.answer');
//     questionContainer.classList.toggle('open');
//     answer.classList.toggle('show');
//     answer.classList.toggle('hidden');
//   }
// });
questions.forEach(question => {
  question.addEventListener('click', function () {
    const answer = question.nextElementSibling;
    answer.classList.toggle('hidden');
    answer.classList.toggle('show');

    // Toggle icon
    const isVisible = !answer.classList.contains('hidden');
    question.querySelector('::before').textContent = isVisible ? '-' : '+';
  });
});
document
  .querySelector('.FAQs-section-container')
  .addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('FAQs').scrollIntoView({ behavior: 'smooth' });
  });
