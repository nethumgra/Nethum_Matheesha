// Luxe Theme - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ===============================
  // Mobile Navigation Toggle
  // ===============================
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
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
    const navLinks = document.querySelectorAll('.luxe-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('h-auto') && window.innerWidth < 768) {
          mobileMenu.classList.add('h-0');
          mobileMenu.classList.remove('h-auto');
          mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }

  // ===============================
  // Scroll Spy & Sticky Header
  // ===============================
  const sections = document.querySelectorAll('section[id]');
  const header = document.getElementById('main-nav');
  const backToTop = document.getElementById('back-to-top');

  function scrollActive() {
    const scrollY = window.pageYOffset;

    // Make header sticky after scrolling down
    if (header) {
      if (scrollY > 100) {
        header.classList.add('scrolled');
        if (backToTop) {
          backToTop.classList.add('opacity-100', 'visible');
          backToTop.classList.remove('opacity-0', 'invisible');
        }
      } else {
        header.classList.remove('scrolled');
        if (backToTop) {
          backToTop.classList.remove('opacity-100', 'visible');
          backToTop.classList.add('opacity-0', 'invisible');
        }
      }
    }
    
    // Highlight active nav link based on scroll position
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector('.luxe-nav-link[href*=' + sectionId + ']');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) {
          document.querySelectorAll('.luxe-nav-link').forEach(link => {
            link.classList.remove('active');
          });
          navLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', scrollActive);

  // Initialize scroll spy
  scrollActive();

  // ===============================
  // Back to top button
  // ===============================
  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===============================
  // Testimonial Slider
  // ===============================
  const testimonialSlider = document.getElementById('testimonial-slider');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  
  if (testimonialSlider && testimonialSlides.length > 0) {
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
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
      });
    }

    // Auto slide every 5 seconds
    let testimonialInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
    
    // Pause auto slide on hover
    if (testimonialSlider) {
      testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
      });
      
      testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
          showSlide(currentSlide + 1);
        }, 5000);
      });
    }
  }

  // ===============================
  // Portfolio Filter
  // ===============================
  const filterButtons = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const portfolioGrid = document.getElementById('portfolio-grid');
  
  if (filterButtons.length && portfolioItems.length) {
    // Portfolio filter functionality
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get the filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (filterValue === 'all' || filterValue === itemCategory) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = 1;
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = 0;
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // ===============================
  // Portfolio Modal
  // ===============================
  const modal = document.getElementById('portfolio-modal');
  const modalContent = document.getElementById('portfolio-modal-content');
  const closeModal = document.getElementById('close-modal');
  const viewButtons = document.querySelectorAll('.portfolio-view-btn');
  
  if (modal && modalContent && closeModal) {
    // Open modal when clicking on a portfolio item
    viewButtons.forEach(button => {
      button.addEventListener('click', function() {
        const portfolioId = this.getAttribute('data-portfolio-id');
        openPortfolioModal(portfolioId);
      });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.classList.add('opacity-0', 'pointer-events-none');
      
      // Clear modal content after fade out
      setTimeout(() => {
        modalContent.innerHTML = '';
      }, 300);
    });
    
    // Close modal if clicking outside content
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal.click();
      }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('opacity-100')) {
        closeModal.click();
      }
    });
  }

  // ===============================
  // Scroll Animation
  // ===============================
  const animateElements = document.querySelectorAll('.service-card, .bg-gray-50, .portfolio-item, .contact-info-item');
  
  if (animateElements.length) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animateElements.forEach((element, index) => {
      // Add staggered animation delay
      element.style.animationDelay = `${0.1 + (index * 0.05)}s`;
      observer.observe(element);
    });
  }

  // ===============================
  // Smooth Scroll
  // ===============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});