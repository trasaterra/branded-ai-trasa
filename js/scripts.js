document.addEventListener('DOMContentLoaded', function() {
  const contentWrapper = document.querySelector('.content-wrapper');
  const logoWrapper = document.querySelector('.answer-logo-wrapper');
  const textarea = document.getElementById('text-input');
  const originalContent = contentWrapper.innerHTML;

  // Initially hide the logo on the landing screen
  if (logoWrapper) {
    logoWrapper.style.display = 'none';
  }

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
    contentWrapper.innerHTML = `
      <div class="answer-bg"></div>
      <div class="answer-window">
        <div id="answerCarousel" class="carousel slide" data-bs-ride="false">
          <div class="carousel-indicators"></div>
          <div class="carousel-inner"></div>
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
    `;

    // Show the logo wrapper after content replacement
    if (logoWrapper) {
      logoWrapper.style.display = 'block';
    }

    // Populate the carousel with answers
    populateCarousel(answers);

    // Update the background image
    setRandomBackground();
  }

  // Function to handle submit action
  function handleSubmit(inputText) {
    const userInput = inputText || textarea.value.trim();
    if (!userInput) return;

    // Split the input text into sentences
    const sentences = userInput
      .split(/(?<=[.!?])\s+/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 0);

    // Replace content with a carousel containing each sentence as a slide
    replaceContentWithCarousel(sentences);
  }

  // Event listener for the submit button
  document.querySelector('.upload-btn').addEventListener('click', () => handleSubmit());

  // Event listener for the Enter key to submit
  textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  });

  // Event listener for the Escape key to fully reset the original content and hide the logo
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      // Restore the original content
      contentWrapper.innerHTML = originalContent;
      
      // Clear the textarea input
      textarea.value = '';

      // Reinitialize the prompt link event listeners
      initializePromptLinks();

      // Hide the logo when Escape is pressed
      if (logoWrapper) {
        logoWrapper.style.display = 'none';
      }
    }
  });

  // JavaScript to make the textarea vertically elastic
  textarea.addEventListener('input', function() {
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
      answerContent.className = 'd-block w-100 p-4';
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
      indicator.innerHTML = `<span class="indicator-number">${index + 1}</span>`;

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
      'https://trasaterra.com/wp-content/uploads/2024/07/2023-Portfolio-SMG_21-scaled.jpg',
      'https://trasaterra.com/wp-content/uploads/2023/04/TT-2021-thumbnails-SJS.jpg',
      'https://trasaterra.com/wp-content/uploads/2023/05/2023-Portfolio-Soapbox_09-scaled.jpg',
      'https://trasaterra.com/wp-content/uploads/2023/03/MIRAS-thumbnail-1.jpg',
      'https://trasaterra.com/wp-content/uploads/2023/02/newsgathering-and-reporting-3-scaled.jpg',
      'https://trasaterra.com/wp-content/uploads/2023/02/fundamentals-of-journalism-3-scaled.jpg',
      'https://trasaterra.com/wp-content/uploads/2019/02/2019-Portfolio-AMP_07-scaled.jpg',
      'https://trasaterra.com/wp-content/uploads/2021/01/CHP-thumbnail3.jpg'
    ];

    const answerWindow = document.querySelector('.answer-window');
    if (!answerWindow) {
      console.error('The .answer-window element was not found.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    console.log('Randomly selected image:', randomImage);

    const img = new Image();
    img.src = randomImage;

    const currentBackground = getComputedStyle(answerWindow).getPropertyValue('--new-background');
    answerWindow.style.setProperty('--previous-background', currentBackground);

    answerWindow.classList.add('fade-out');

    img.onload = function () {
      answerWindow.style.setProperty('--new-background', `url(${randomImage})`);
      answerWindow.classList.add('fade-in');
      answerWindow.classList.remove('fade-out');
      console.log('Background image applied successfully:', randomImage);
    };

    img.onerror = function () {
      console.error('Failed to load image:', randomImage);
    };
  }
});
