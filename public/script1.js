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
const blogPosts = [
  {
    title: 'The Future of Fuel Economy: Trends and Predictions',
    excerpt:
      'Explore the latest trends in fuel economy and what experts predict for the future of transportation.',
    date: '2024-05-15',
    author: 'Jane Doe',
    slug: 'future-of-fuel-economy',
  },
  {
    title: "10 Tips to Maximize Your Vehicle's Fuel Efficiency",
    excerpt:
      'Learn practical tips and tricks to get the most out of every gallon of fuel in your vehicle.',
    date: '2024-05-10',
    author: 'John Smith',
    slug: 'maximize-fuel-efficiency',
  },
  {
    title: 'Electric vs. Hybrid: A Comprehensive Comparison',
    excerpt:
      'Dive into the pros and cons of electric and hybrid vehicles in terms of fuel economy and environmental impact.',
    date: '2024-05-05',
    author: 'Alex Johnson',
    slug: 'electric-vs-hybrid',
  },
];

function createBlogPostCard(post) {
  const card = document.createElement('div');
  card.className = 'card';

  const cardHeader = document.createElement('div');
  cardHeader.className = 'card-header';

  const cardTitle = document.createElement('h3');
  cardTitle.className = 'card-title';
  cardTitle.textContent = post.title;

  const cardDescription = document.createElement('p');
  cardDescription.className = 'card-description';
  cardDescription.textContent = `${post.date} | By ${post.author}`;

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(cardDescription);

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  const excerpt = document.createElement('p');
  excerpt.textContent = post.excerpt;
  cardContent.appendChild(excerpt);

  const cardFooter = document.createElement('div');
  cardFooter.className = 'card-footer';
  const readMoreLink = document.createElement('a');
  readMoreLink.href = `/blog/${post.slug}`;
  readMoreLink.className = 'btn btn-outline';
  readMoreLink.textContent = 'Read More';
  cardFooter.appendChild(readMoreLink);

  card.appendChild(cardHeader);
  card.appendChild(cardContent);
  card.appendChild(cardFooter);

  return card;
}

function renderBlogPosts() {
  const blogGrid = document.getElementById('blogGrid');
  blogPosts.forEach(post => {
    const card = createBlogPostCard(post);
    blogGrid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderBlogPosts);
