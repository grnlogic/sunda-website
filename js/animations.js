document.addEventListener("DOMContentLoaded", function () {
  // Animate hero section elements
  animateHeroSection();

  // Animate sections on scroll
  animateSectionsOnScroll();

  // Initialize tab animations
  initTabAnimations();

  // Add animation to category cards on hover
  animateCategoryCards();
});

// Hero section animations
function animateHeroSection() {
  const title = document.querySelector(".animate-title");
  const subtitle = document.querySelector(".animate-subtitle");
  const buttons = document.querySelector(".hero-buttons");
  const heroImage = document.querySelector(".hero-image");

  if (title) title.classList.add("fade-in-up");

  // Delay the subtitle animation
  setTimeout(() => {
    if (subtitle) subtitle.classList.add("fade-in-up");
  }, 300);

  // Delay the buttons animation
  setTimeout(() => {
    if (buttons) buttons.classList.add("fade-in-up");
  }, 600);

  // Delay the image animation
  setTimeout(() => {
    if (heroImage) heroImage.classList.add("fade-in");
  }, 900);
}

// Animate sections as they come into view while scrolling
function animateSectionsOnScroll() {
  // Select all section headers and cards
  const elements = document.querySelectorAll(
    ".section-header, .category-card, .exercise-card, .game-card, .stat-card, .aksara-interactive, .aksara-learn"
  );

  // Create the IntersectionObserver
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    },
    { threshold: 0.1 }
  ); // Trigger when 10% of the element is visible

  // Start observing each element
  elements.forEach((element) => {
    element.classList.add("pre-animate"); // Add the pre-animation class
    observer.observe(element);
  });
}

// Handle tab animations for media section
function initTabAnimations() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".media-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabName = btn.getAttribute("data-tab");

      // Deactivate all tabs
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => {
        content.classList.remove("active");
        content.classList.remove("fade-in");
      });

      // Activate the selected tab
      btn.classList.add("active");
      const activeContent = document.getElementById(`${tabName}-content`);
      if (activeContent) {
        activeContent.classList.add("active");

        // Add a small delay before adding the fade-in class
        setTimeout(() => {
          activeContent.classList.add("fade-in");
        }, 50);
      }
    });
  });
}

// Animate category cards on hover
function animateCategoryCards() {
  const cards = document.querySelectorAll(
    ".category-card, .exercise-card, .game-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("pulse");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("pulse");

      // Add a subtle bounce effect when mouse leaves
      card.classList.add("bounce");
      setTimeout(() => {
        card.classList.remove("bounce");
      }, 300);
    });
  });
}

// Add animation for word card flip
function initWordCardAnimation() {
  const wordCard = document.querySelector(".word-card");
  const flipBtn = document.getElementById("flip-word-btn");

  if (wordCard && flipBtn) {
    flipBtn.addEventListener("click", () => {
      wordCard.classList.toggle("flipped");
    });
  }
}

// Animation for Aksara converter
function initAksaraAnimation() {
  const convertBtn = document.getElementById("convert-btn");
  const aksaraResult = document.getElementById("aksara-result");

  if (convertBtn && aksaraResult) {
    convertBtn.addEventListener("click", () => {
      aksaraResult.classList.add("flash");

      setTimeout(() => {
        aksaraResult.classList.remove("flash");
      }, 500);
    });
  }
}

// Add scroll to section animation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize all animations
document.addEventListener("DOMContentLoaded", function () {
  initWordCardAnimation();
  initAksaraAnimation();
  initSmoothScroll();

  // Add loading screen fadeout
  const loadingScreen = document.querySelector(".loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");

      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 1500);
  }
});

// Add these CSS classes to enable the animations
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
    /* Entry Animations */
    .fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    .fade-in {
        animation: fadeIn 1s ease forwards;
    }
    
    .fade-out {
        animation: fadeOut 0.5s ease forwards;
    }
    
    /* Pre-animation states */
    .pre-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    /* Animated state */
    .animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Tab content animation */
    .media-content.fade-in {
        animation: fadeIn 0.5s ease forwards;
    }
    
    /* Pulse animation for hover */
    .pulse {
        animation: pulse 0.5s ease;
    }
    
    /* Bounce animation */
    .bounce {
        animation: bounce 0.3s ease;
    }
    
    /* Flash animation for Aksara result */
    .flash {
        animation: flash 0.5s ease;
    }
    
    /* Flashing animation when new word appears */
    @keyframes flash {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
            transform: scale(1.05);
        }
    }
    
    /* Keyframes */
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-5px);
        }
    }
</style>
`
);
