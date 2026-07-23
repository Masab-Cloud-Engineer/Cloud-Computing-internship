/**
 * MUHAMMAD MASAB - CLOUD ENGINEER PORTFOLIO SCRIPT
 * Tech: Pure Vanilla JavaScript (ES6+)
 * No external framework dependencies, ideal for AWS S3 static website hosting.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  /* ==========================================================================
     Theme Toggle (Light / Dark Mode)
     ========================================================================== */
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        showToast('Switched to Dark Mode');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        showToast('Switched to Light Mode');
      }
    });
  }

  /* ==========================================================================
     1. Sticky Navigation & Scroll Header Shadow
     ========================================================================== */
  const handleScrollHeader = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Show/hide Back to Top button
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScrollHeader);

  /* ==========================================================================
     2. Mobile Hamburger Menu Toggle
     ========================================================================== */
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  }

  // Close mobile drawer when clicking any link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });
  });

  /* ==========================================================================
     3. Active Link Highlight on Scroll (Intersection Observer)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  /* ==========================================================================
     4. Animated Skill Bars Trigger on Scroll
     ========================================================================== */
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  let animatedSkills = false;

  const animateSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos && !animatedSkills) {
      skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth;
      });
      animatedSkills = true;
    }
  };

  window.addEventListener('scroll', animateSkills);
  // Trigger once in case user lands directly on skills
  animateSkills();

  /* ==========================================================================
     5. Back to Top Button Click Handler
     ========================================================================== */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     6. Copy Email to Clipboard Feature
     ========================================================================== */
  const showToast = (message) => {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy email.');
      });
    });
  }

  /* ==========================================================================
     7. Static Contact Form Submission Handler
     ========================================================================== */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name').value.trim();

      // Show friendly confirmation toast for static website user
      showToast(`Thank you, ${nameInput}! Message received. (Static mode active)`);

      // Clear input fields
      contactForm.reset();
    });
  }

  /* Console Welcome Message for Recruiters & Cloud Engineers */
  console.log(
    '%c Cloud Portfolio Website - Muhammad Masab %c Deployed on AWS S3 ',
    'background:#ff9900; color:#0b0f19; font-weight:bold; font-size:12px; padding:4px;',
    'background:#111827; color:#00d2ff; font-weight:bold; font-size:12px; padding:4px;'
  );
});
