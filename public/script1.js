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

// fuel economy calculator
const EfficiencyForm = document.getElementById('efficiency-form');
const Loading = document.getElementById('loading');
const fuelChartCanvas = document.getElementById('fuel-chart');
const chartContainer = document.querySelector('.chart-container-about');
let fuelChart;

EfficiencyForm.addEventListener('submit', function (event) {
  event.preventDefault();
  Loading.classList.remove('hidden');
  setTimeout(() => {
    const annualMileage = parseFloat(
      document.getElementById('annual-mileage').value
    );
    const currentMpg = parseFloat(document.getElementById('current-mpg').value);
    const targetMpg = parseFloat(document.getElementById('target-mpg').value);

    const fuelSaved = (
      annualMileage / currentMpg -
      annualMileage / targetMpg
    ).toFixed(2);
    if (!isNaN(fuelSaved) && fuelSaved >= 0) {
      document.getElementById('fuel-saved').innerText = fuelSaved;
      document.getElementById('result').classList.remove('hidden');
      document.getElementById('fuel-chart').classList.remove('hidden');
      chartContainer.classList.remove('hidden');

      // Preparing the data
      const labels = ['Current MPG', 'Target MPG', 'Fuel Saved'];
      const data = [currentMpg, targetMpg, fuelSaved];

      // create the chart
      if (fuelChart) {
        fuelChart.data.datasets[0].data = data;
        fuelChart.update();
      } else {
        fuelChart = new Chart(fuelChartCanvas, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Fuel Economy Analysis',
                data: data,
                backgroundColor: [
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },

          // bar graph
          // options: {
          //   scales: {
          //     y: {
          //       beginAtZero: true,
          //     },
          //   },
          // },

          // pie chart
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function () {
                    return `${tooltipItem.label}: ${tooltipItem.raw} MPG`;
                  },
                },
              },
            },
          },

          // radar chart
          // options: {
          //   scales: {
          //     r: {
          //       min: 0,
          //       max: 50,
          //       ticks: {
          //         stepSize: 10,
          //       },
          //     },
          //   },
          // },
        });
      }
    } else {
      document.getElementById('fuel-saved').innerText =
        'Invalid input. Please check your values.';
      document.getElementById('result').classList.remove('hidden');
    }
    Loading.classList.add('hidden');
  }, 1000);
});
