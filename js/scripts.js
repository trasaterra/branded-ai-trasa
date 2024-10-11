// Save the original landing/resting page content
  const originalContent = document.querySelector('.content-wrapper').innerHTML;

  // JavaScript to handle hover behavior and ensure smooth animation
  function initializePromptLinks() {
    document.querySelectorAll('.prompt-link').forEach(function(link) {
      link.addEventListener('mouseover', function() {
        link.classList.add('spin-animation');
      });

      link.addEventListener('animationend', function() {
        link.classList.remove('spin-animation');
      });

      // Add click event to trigger the carousel screen with the corresponding prompt text
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        handleSubmit(link.textContent.trim()); // Use the same function to simulate user submission
      });
    });

    preventWidows('.prompt-link');
  }

  function preventWidows(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      const words = el.innerHTML.split(' ');
      if (words.length > 1) {
        words[words.length - 2] += '&nbsp;' + words.pop();
        el.innerHTML = words.join(' ');
      }
    });
  }

  // Function to replace content with a carousel
function replaceContentWithCarousel(answers) {
  const contentWrapper = document.querySelector('.content-wrapper');
  contentWrapper.innerHTML = `
    <div class="answer-bg"></div>
    
    <div class="answer-window">
      
      <div id="answerCarousel" class="carousel slide" data-bs-ride="false">
        <!-- Carousel indicators -->
        <div class="carousel-indicators"></div>
        <div class="carousel-inner">
          <!-- Slides will be dynamically added here -->
        </div>
        <!-- Carousel controls -->
        <button class="carousel-control-prev" type="button" data-bs-target="#answerCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#answerCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <div class="logo-wrapper answer-logo-wrapper">
        <a href="http://trasaterra.com" target="_blank">
          <img class="trasaterra-logo" src="img/trasaterra-small-logomark-white.svg" alt="Trasaterra">
          
        </a>
    </div>
  `;
  
  // Populate the carousel with answers
  populateCarousel(answers);

  // Call setRandomBackground() after the .answer-window has been added to the DOM
  setRandomBackground();
}


  // Function to populate the carousel with answers
  

  // Function to handle submit action
  function handleSubmit(inputText) {
    const userInput = inputText || document.getElementById('text-input').value.trim();
    if (!userInput) return;

    const exampleAnswers = [
      `Response for: “${userInput}”. This demonstrates using the same carousel for both input and prompt link clicks.`,
      "This is the second example answer to show how the carousel can handle multiple slides.",
      "Here is the third example answer, ensuring consistency in the carousel display for prototyping."
    ];
    replaceContentWithCarousel(exampleAnswers);
  }

  // Updated handleSubmit function to split text into sentences and create slides for each
function handleSubmit(inputText) {
  const userInput = inputText || document.getElementById('text-input').value.trim();
  if (!userInput) return;

  // Split the text into sentences
  const sentences = userInput
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim()) // Trim each sentence
    .filter(sentence => sentence.length > 0); // Filter out empty sentences

  // Create formatted answers for the carousel
  const formattedAnswers = sentences.map(sentence => `This is the answer to the question: “${sentence}”`);

  // Replace content with a carousel containing each formatted answer as a slide
  replaceContentWithCarousel(formattedAnswers);
}



  // Event listener for the submit button
  document.querySelector('.upload-btn').addEventListener('click', () => handleSubmit());

  // Event listener for the Enter key to submit
  const textarea = document.getElementById('text-input');
  textarea.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  });

 // Event listener for the Escape key to fully reset the original content and functionality
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    // Restore the original content
    const contentWrapper = document.querySelector('.content-wrapper');
    contentWrapper.innerHTML = originalContent;
    
    // Clear the textarea input
    document.getElementById('text-input').value = '';

    // Reinitialize the prompt link event listeners
    initializePromptLinks();
  }
});


  // JavaScript to make the textarea vertically elastic
  textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = `${this.scrollHeight}px`;
  });

  // Initialize prompt links on page load
  initializePromptLinks();

function populateCarousel(answers) {
  const carouselInner = document.querySelector('#answerCarousel .carousel-inner');
  const carouselIndicators = document.querySelector('.carousel-indicators');
  const carouselControlsPrev = document.querySelector('.carousel-control-prev');
  const carouselControlsNext = document.querySelector('.carousel-control-next');

  // Clear existing carousel items and indicators
  carouselInner.innerHTML = '';
  carouselIndicators.innerHTML = '';

  // Check if answers array is empty
  if (!answers.length) {
    console.warn('No answers provided to populate the carousel.');
    return;
  }

  // Populate the carousel with the given answers
  answers.forEach((answer, index) => {
    // Create carousel item
    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item' + (index === 0 ? ' active' : '');

    // Create content for the carousel item
    const answerContent = document.createElement('div');
    answerContent.className = 'd-block w-100 p-4'; // Center the text for better presentation
    answerContent.innerHTML = `
      <div class="parent-container">
        <div class="container answer-vertical">
          <p>${answer}</p>
        </div>
      </div>`;

    carouselItem.appendChild(answerContent);
    carouselInner.appendChild(carouselItem);

    // Create carousel indicator
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.setAttribute('data-bs-target', '#answerCarousel');
    indicator.setAttribute('data-bs-slide-to', index);
    indicator.setAttribute('aria-label', `Slide ${index + 1}`);
    indicator.innerHTML = `<span class="indicator-number">${index + 1}</span>`; // Add the number inside the indicator

    if (index === 0) {
      indicator.classList.add('active');
      indicator.setAttribute('aria-current', 'true');
    }

    carouselIndicators.appendChild(indicator);
  });

  // Show or hide carousel controls and indicators based on the number of slides
  const hasMultipleSlides = answers.length > 1;
  carouselControlsPrev.style.display = hasMultipleSlides ? 'block' : 'none';
  carouselControlsNext.style.display = hasMultipleSlides ? 'block' : 'none';
  carouselIndicators.style.display = hasMultipleSlides ? 'block' : 'none';
}


function setRandomBackground() {
  const images = [
    '/img/backgrounds/background-1.jpg',
    '/img/backgrounds/background-2.jpg',
    '/img/backgrounds/background-3.jpg',
    '/img/backgrounds/background-4.jpg',
    '/img/backgrounds/background-5.jpg',
    '/img/backgrounds/background-6.jpg'
  ];

  const answerWindow = document.querySelector('.answer-window');
  if (!answerWindow) {
    console.error('The .answer-window element was not found.');
    return; // Exit the function if the element doesn't exist
  }

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  console.log('Randomly selected image:', randomImage);

  const img = new Image();
  img.src = randomImage;

  img.onload = function () {
    // Set the background image using a CSS custom property
    answerWindow.style.setProperty('--background-image', `url(${randomImage})`);

    // Trigger fade-in effect
    answerWindow.classList.remove('fade-in'); // Reset opacity if needed
    void answerWindow.offsetWidth; // Trigger reflow to restart the animation
    answerWindow.classList.add('fade-in'); // Add the fade-in class
    console.log('Background image applied successfully:', randomImage);
  };

  img.onerror = function () {
    console.error('Failed to load image:', randomImage);
  };
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setRandomBackground);
