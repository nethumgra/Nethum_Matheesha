// Main JavaScript for Nethum's Portfolio

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ===============================
  // Mobile Navigation Toggle
  // ===============================
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton.addEventListener('click', function() {
    if (mobileMenu.classList.contains('h-0')) {
      mobileMenu.classList.remove('h-0');
      mobileMenu.classList.add('h-auto');
      mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenu.classList.add('h-0');
      mobileMenu.classList.remove('h-auto');
      mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close mobile menu when clicking on a nav item
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('h-auto')) {
        mobileMenu.classList.add('h-0');
        mobileMenu.classList.remove('h-auto');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // ===============================
  // Scroll Spy & Sticky Header
  // ===============================
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('main-nav');
  const backToTop = document.getElementById('back-to-top');

  function scrollActive() {
    const scrollY = window.pageYOffset;

    // Make header sticky after scrolling down
    if (scrollY > 100) {
      header.classList.add('py-3', 'shadow-lg');
      header.classList.remove('py-4');
      backToTop.classList.add('opacity-100', 'visible');
      backToTop.classList.remove('opacity-0', 'invisible');
    } else {
      header.classList.remove('py-3', 'shadow-lg');
      header.classList.add('py-4');
      backToTop.classList.remove('opacity-100', 'visible');
      backToTop.classList.add('opacity-0', 'invisible');
    }
    
    // Highlight active nav link based on scroll position
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector('.nav-link[href*=' + sectionId + ']');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) {
          navLink.classList.add('active');
        }
      } else {
        if (navLink) {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollActive);

  // ===============================
  // Back to top button
  // ===============================
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===============================
  // Testimonial Slider
  // ===============================
  const testimonialSlider = document.getElementById('testimonial-slider');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let currentSlide = 0;
  
  function showSlide(index) {
    if (index < 0) {
      currentSlide = testimonialSlides.length - 1;
    } else if (index >= testimonialSlides.length) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  
  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });
  
  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });

  // Auto slide every 5 seconds
  let testimonialInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);
  
  // Pause auto slide on hover
  testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });
  
  testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  });

  // ===============================
  // Scroll Animation
  // ===============================
  const animateElements = document.querySelectorAll('.service-card, .skill-card, .portfolio-item, .contact-info-item');
  
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // ===============================
  // Initialize other components
  // ===============================
  // Set an active class for the first filter button
  document.querySelector('.portfolio-filter-btn').classList.add('active');
});
