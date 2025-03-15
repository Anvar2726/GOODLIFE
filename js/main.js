const hamburgerMenu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector(".header-item");
const images = document.querySelectorAll(".slider img");
const dots = document.querySelectorAll(".dot");
let index = 0;

if (window.innerWidth > 990) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      document.documentElement.style.setProperty("--header-padding", "10px");
    } else {
      document.documentElement.style.setProperty("--header-padding", "20px");
    }
  });
} else {
  document.documentElement.style.setProperty("--header-padding", "10px");
  document.getElementsByTagName("main")[0].style.marginTop = "65px";
}

hamburgerMenu.addEventListener("click", function (e) {
  e.stopPropagation();
  navbar.classList.toggle("header-nav-hide");
});

window.addEventListener("click", function (e) {
  let checkClass = navbar.contains(e.target);
  if (!checkClass) {
    navbar.classList.remove("header-nav-hide");
  }
});


// SLIDER
document.addEventListener("DOMContentLoaded", function () {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const slides = document.querySelectorAll(".swiper-slide");
  const bullets = document.querySelectorAll(".swiper-pagination-bullet");
  const prevButton = document.querySelector(".swiper-button-prev");
  const nextButton = document.querySelector(".swiper-button-next");

  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayInterval;
  let startX, moveX;
  let isDragging = false;

  // Function to update slide position
  function updateSlide() {
    swiperWrapper.style.transform = `translateX(-${currentIndex * 25}%)`;

    // Update pagination bullets
    bullets.forEach((bullet, index) => {
      if (index === currentIndex) {
        bullet.classList.add("swiper-pagination-bullet-active");
      } else {
        bullet.classList.remove("swiper-pagination-bullet-active");
      }
    });
  }

  // Function to go to next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlide();
  }

  // Function to go to previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlide();
  }

  // Set up click events for pagination bullets
  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
      currentIndex = index;
      updateSlide();
      resetAutoplay();
    });
  });

  // Set up click events for navigation buttons
  prevButton.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  // Set up autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  // Touch events for mobile swipe
  const swiperContainer = document.querySelector(".swiper-container");

  swiperContainer.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      clearInterval(autoplayInterval);
    },
    { passive: true }
  );

  swiperContainer.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      moveX = e.touches[0].clientX;
      const diff = moveX - startX;

      // Add some resistance to the drag
      const translateX =
        -currentIndex * 25 + (diff / swiperContainer.offsetWidth) * 5;
      swiperWrapper.style.transform = `translateX(${translateX}%)`;
    },
    { passive: true }
  );

  swiperContainer.addEventListener(
    "touchend",
    () => {
      isDragging = false;

      if (!moveX) return;

      const diff = moveX - startX;

      if (diff > 50) {
        prevSlide();
      } else if (diff < -50) {
        nextSlide();
      } else {
        updateSlide(); // Reset to current slide position
      }

      startX = null;
      moveX = null;
      startAutoplay();
    },
    { passive: true }
  );

  // Initialize slider
  startAutoplay();
});
