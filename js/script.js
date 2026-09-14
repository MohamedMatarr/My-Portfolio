/**
 * ==========================================================================
 * MOHAMED HOSSAM — AI ENGINEER PORTFOLIO JAVASCRIPT
 * Vanilla JS: Theme Management, Neural Canvas, Scroll Reveal, Project Modals
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. THEME TOGGLE (DEFAULT: DARK MODE)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Check saved theme or default to dark
  const savedTheme = localStorage.getItem('mh_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('mh_portfolio_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION MENU
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. ACTIVE NAVIGATION LINK ON SCROLL
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = document.getElementById('siteHeader')?.offsetHeight || 72;

  function highlightActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight - 80;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // --------------------------------------------------------------------------
  // 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // --------------------------------------------------------------------------
  // 5. PROJECT DETAILS DATABASE & MODAL CONTROLLER
  // --------------------------------------------------------------------------
  const projectDatabase = {
    'project-maintenance': {
      title: 'Predictive Maintenance System',
      category: 'Industrial AI & Machine Learning',
      badge: 'Two-Stage Architecture',
      summary: 'An end-to-end industrial machine learning system designed to preemptively detect equipment anomalies and classify expected mechanical failure types before costly downtime occurs.',
      specs: [
        { label: 'Problem Formulation', value: 'Binary & Multi-Class Classification' },
        { label: 'Primary Architecture', value: 'Two-Stage Prediction System' },
        { label: 'Champion Model', value: 'Random Forest Classifier' },
        { label: 'Model Evaluation', value: 'Precision: 91% | Recall: 82%' },
        { label: 'Dataset Volume', value: '10,000 Records (15 Features)' },
        { label: 'User Interface', value: 'Streamlit Interactive Web App' }
      ],
      detailsHtml: `
        <p><strong>System Architecture &amp; Methodology:</strong></p>
        <p>The system is engineered as a coordinated two-tier pipeline:</p>
        <ul>
          <li><strong>Stage 1 (Anomaly Detection):</strong> Predicts whether a machine will experience an impending failure based on real-time sensor streams.</li>
          <li><strong>Stage 2 (Root Cause Classification):</strong> When an anomaly is triggered, a multi-class model isolates the exact failure mechanism:
            <ul>
              <li><strong>HDF:</strong> Heat Dissipation Failure</li>
              <li><strong>OSF:</strong> Overstrain Failure</li>
              <li><strong>PWF:</strong> Power Failure</li>
              <li><strong>RNF:</strong> Random Failure</li>
              <li><strong>TWF:</strong> Tool Wear Failure</li>
            </ul>
          </li>
        </ul>
        <p style="margin-top: 10px;"><strong>Feature Engineering &amp; Benchmarking:</strong></p>
        <ul>
          <li>Engineered physical domain attributes: <em>Temperature Difference</em> (process vs. air temperature), <em>Power</em> (rotational speed × torque), and <em>Strain</em> (tool wear accumulation).</li>
          <li>Models tested: Random Forest, Support Vector Classifier (SVC), and Artificial Neural Networks (ANN). Random Forest achieved optimal balance between false positives and critical detection recall.</li>
        </ul>
      `,
      tech: ['Python', 'Streamlit', 'Scikit-learn', 'Random Forest', 'SVC', 'ANN', 'Pandas', 'NumPy', 'Feature Engineering'],
      links: [
        { text: 'Live Streamlit Demo', url: 'https://finalprojectnti-cza4oepmzmd8uq3ayg8xrh.streamlit.app/', isPrimary: true, icon: 'fa-solid fa-arrow-up-right-from-square' },
        { text: 'GitHub Repository', url: 'https://github.com/MohamedMatarr/Final_project_NTI', isPrimary: false, icon: 'fa-brands fa-github' }
      ]
    },

    'project-churn': {
      title: 'Ecommerce Customer Churn Prediction',
      category: 'Ecommerce ML System',
      badge: 'Binary Classification',
      summary: 'A machine learning system that predicts whether an e-commerce customer is likely to churn, using behavioral and transactional features such as tenure, satisfaction score, complaints, and cashback activity — enabling proactive retention strategies.',
      specs: [
        { label: 'Best Model', value: 'Random Forest Classifier' },
        { label: 'Accuracy', value: '94%' },
        { label: 'Precision', value: '90%' },
        { label: 'Recall', value: '73%' },
        { label: 'ROC-AUC Score', value: '0.9587' },
        { label: 'Dataset Volume', value: '3,941 Records' }
      ],
      detailsHtml: `
        <p><strong>Project Overview:</strong></p>
        <p>This project builds an end-to-end churn prediction pipeline for an e-commerce platform, enabling the business to proactively identify at-risk customers before they leave.</p>
        <p style="margin-top: 10px;"><strong>Key Features &amp; Methodology:</strong></p>
        <ul>
          <li><strong>Feature Engineering:</strong> Behavioral and transactional signals including tenure, satisfaction score, number of complaints, preferred payment mode, and cashback amount were engineered and selected for maximum predictive power.</li>
          <li><strong>Missing Value Handling:</strong> KNN Imputer was applied to handle missing values in numerical features, preserving distributional integrity.</li>
          <li><strong>Model Benchmarking:</strong> Multiple algorithms were evaluated — Random Forest and AdaBoost were shortlisted, with hyperparameter tuning via GridSearchCV. Random Forest achieved the best overall balance of precision and ROC-AUC.</li>
          <li><strong>Deployment:</strong> Packaged as an interactive Streamlit web application, allowing real-time churn probability prediction from user-provided customer inputs.</li>
        </ul>
      `,
      tech: ['Python', 'Streamlit', 'Scikit-learn', 'Random Forest', 'AdaBoost', 'GridSearchCV', 'Feature Engineering', 'KNN Imputer', 'Pandas', 'NumPy'],
      links: [
        { text: 'Live Streamlit Demo', url: 'https://ecommercecustomerchurn.streamlit.app/', isPrimary: true, icon: 'fa-solid fa-arrow-up-right-from-square' },
        { text: 'GitHub Repository', url: 'https://github.com/MohamedMatarr/Ecommerce_Customer_Churn.git', isPrimary: false, icon: 'fa-brands fa-github' }
      ]
    },

    'project-plant': {
      title: 'Plant Disease Classification',
      category: 'Computer Vision & Deep Learning',
      badge: 'Convolutional Neural Network',
      summary: 'A deep learning computer vision solution trained on leaf pathology datasets to assist agricultural operations in rapid disease detection and crop preservation.',
      specs: [
        { label: 'Architecture', value: 'Convolutional Neural Network (CNN)' },
        { label: 'Framework', value: 'TensorFlow & Keras' },
        { label: 'Focus Domain', value: 'Plant Pathology & Vision' },
        { label: 'Input Modality', value: 'Multi-Spectral Leaf Imagery' }
      ],
      detailsHtml: `
        <p><strong>Deep Learning Pipeline:</strong></p>
        <ul>
          <li><strong>Image Preprocessing:</strong> Data augmentation pipeline (random flips, rotations, zooming, and color jitter) to mitigate overfitting and simulate variable outdoor lighting conditions.</li>
          <li><strong>Network Structure:</strong> Sequential convolutional blocks with batch normalization, ReLU activations, max-pooling layers, and dropout regularization.</li>
          <li><strong>Evaluation Focus:</strong> Evaluated using categorical cross-entropy loss, top-1 accuracy, and confusion matrix analysis to verify minimal confusion between closely resembling blight symptoms.</li>
        </ul>
      `,
      tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Computer Vision', 'Data Augmentation'],
      links: [
        { text: 'GitHub Repository (In Progress)', url: 'https://github.com/MohamedMatarr', isPrimary: false, icon: 'fa-brands fa-github' }
      ]
    },

    'project-scouting': {
      title: 'Scouting Analysis System',
      category: 'Sports Analytics & Data Science',
      badge: 'Data-Driven Decision Making',
      summary: 'An interactive analytical system that examines multi-dimensional player performance metrics to provide scouts, coaches, and managers with objective talent evaluation.',
      specs: [
        { label: 'Core Objective', value: 'Objective Talent Evaluation' },
        { label: 'Data Science Core', value: 'Pandas & NumPy' },
        { label: 'Visualization', value: 'Plotly & Seaborn' },
        { label: 'Interface', value: 'Interactive Analytical Dashboard' }
      ],
      detailsHtml: `
        <p><strong>Methodological Framework:</strong></p>
        <ul>
          <li><strong>Metric Normalization:</strong> Percentile rank transforms and z-score normalization across position-specific athletic and tactical indicators.</li>
          <li><strong>Similarity Clustering:</strong> K-Means and cosine similarity clustering to uncover statistical "lookalike" players based on athletic output and playmaking efficiency.</li>
          <li><strong>Actionable UI:</strong> Visual radar charts and scatter plots allowing non-technical scouts to compare candidates side-by-side with clarity.</li>
        </ul>
      `,
      tech: ['Python', 'Pandas', 'Plotly', 'Seaborn', 'Matplotlib', 'Scikit-learn', 'Clustering', 'Interactive UI'],
      links: [
        { text: 'GitHub Profile', url: 'https://github.com/MohamedMatarr', isPrimary: false, icon: 'fa-brands fa-github' }
      ]
    },

    'project-fifa': {
      title: 'FIFA Player Rating Classification',
      category: 'Predictive Modeling & Deployment',
      badge: 'Gradio Deployment',
      summary: 'A high-precision predictive modeling project that predicts elite athletic status from player attribute profiles, verified with 99.3% accuracy and deployed with a Gradio interface.',
      specs: [
        { label: 'Algorithm', value: 'Support Vector Classifier (SVC)' },
        { label: 'Benchmark Accuracy', value: '99.3% Tested Accuracy' },
        { label: 'Dataset Dimension', value: '19,667 Records • 9 Attributes' },
        { label: 'Deployment App', value: 'Gradio Interactive Web UI' }
      ],
      detailsHtml: `
        <p><strong>Technical Execution &amp; Results:</strong></p>
        <ul>
          <li><strong>Dataset Preparation:</strong> Cleaned 19,667 athlete entries, imputed missing physical metrics, and encoded target categorization for elite rating thresholds.</li>
          <li><strong>Feature Engineering:</strong> Selected 9 key predictive attributes capturing physical stamina, technical prowess, composure, and tactical vision.</li>
          <li><strong>Model Optimization:</strong> Hyperparameter grid-search optimization of kernel parameters (RBF kernel, C-penalty, and gamma scaling), yielding 99.3% classification accuracy.</li>
          <li><strong>Interactive Deployment:</strong> Built a lightweight Gradio interface allowing users to adjust player attributes on sliders and immediately receive classification probabilities.</li>
        </ul>
      `,
      tech: ['Python', 'Gradio', 'Support Vector Classifier (SVC)', 'Scikit-learn', 'Feature Engineering', 'Hyperparameter Tuning'],
      links: [
        { text: 'GitHub Profile', url: 'https://github.com/MohamedMatarr', isPrimary: false, icon: 'fa-brands fa-github' }
      ]
    }
  };

  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const openModalButtons = document.querySelectorAll('.open-modal-btn');

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data || !projectModal) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.summary;
    document.getElementById('modalType').textContent = data.category;
    document.getElementById('modalTag').textContent = data.badge;

    // Populate Specs Grid
    const specsContainer = document.getElementById('modalSpecsGrid');
    specsContainer.innerHTML = data.specs.map(spec => `
      <div class="modal-spec-card">
        <div class="modal-spec-label">${spec.label}</div>
        <div class="modal-spec-val">${spec.value}</div>
      </div>
    `).join('');

    // Populate Rich Text Details
    document.getElementById('modalDetailsText').innerHTML = data.detailsHtml;

    // Populate Tech Stack
    const techContainer = document.getElementById('modalTechStack');
    techContainer.innerHTML = data.tech.map(t => `<span class="tag">${t}</span>`).join('');

    // Populate Links Row
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = data.links.map(link => `
      <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm ${link.isPrimary ? 'btn-primary' : 'btn-secondary'}">
        <i class="${link.icon}"></i>
        <span>${link.text}</span>
      </a>
    `).join('');

    // Show modal
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projectId = btn.getAttribute('data-modal');
      openProjectModal(projectId);
    });
  });

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  // Close on Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // --------------------------------------------------------------------------
  // 6. HERO NEURAL NETWORK PARTICLE CANVAS
  // --------------------------------------------------------------------------
  const canvas = document.getElementById('neuralCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let animationFrameId;
    let isVisible = true;

    function resizeCanvas() {
      width = canvas.parentElement.offsetWidth;
      height = canvas.parentElement.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    }

    function initParticles() {
      particles = [];
      const particleCount = Math.min(Math.floor((width * height) / 18000), 55);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.6 + 1.2
        });
      }
    }

    function renderParticles() {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const nodeColor = isDark ? 'rgba(56, 189, 248, 0.7)' : 'rgba(2, 132, 199, 0.6)';
      const lineColor = isDark ? 'rgba(99, 102, 241, ' : 'rgba(79, 70, 229, ';

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const alpha = (1 - dist / 115) * (isDark ? 0.22 : 0.15);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor + alpha + ')';
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderParticles);
    }

    // Pause canvas when out of view to save CPU/Battery
    const heroSection = document.getElementById('hero');
    if ('IntersectionObserver' in window && heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            renderParticles();
          }
        });
      }, { threshold: 0.05 });

      heroObserver.observe(heroSection);
    }

    window.addEventListener('resize', debounce(resizeCanvas, 150));
    resizeCanvas();
    renderParticles();
  }

  // --------------------------------------------------------------------------
  // 7. BACK TO TOP BUTTON
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 8. CONTACT FORM VALIDATION & INTERACTION
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showError(nameInput);
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        showError(emailInput);
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        showError(messageInput);
        isValid = false;
      } else {
        clearError(messageInput);
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const originalHtml = submitBtn.innerHTML;
        const name = nameInput.value.trim();

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';

        fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        })
          .then(response => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHtml;

            if (response.ok) {
              // ✅ Success
              if (formStatus) {
                formStatus.className = 'form-status-box success';
                formStatus.innerHTML =
                  '<i class="fa-solid fa-circle-check"></i> Thank you, ' +
                  escapeHtml(name) +
                  '! Your message has been sent. Mohamed will get back to you shortly.';
              }
              contactForm.reset();

              // Auto-hide after 7 s
              setTimeout(() => {
                if (formStatus) {
                  formStatus.className = 'form-status-box';
                  formStatus.innerHTML = '';
                }
              }, 7000);
            } else {
              // ❌ Formspree returned a non-OK status
              if (formStatus) {
                formStatus.className = 'form-status-box error';
                formStatus.innerHTML =
                  '<i class="fa-solid fa-circle-exclamation"></i> Oops! Something went wrong. Please try again or email directly.';
              }
            }
          })
          .catch(() => {
            // ❌ Network / connection error
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHtml;

            if (formStatus) {
              formStatus.className = 'form-status-box error';
              formStatus.innerHTML =
                '<i class="fa-solid fa-circle-exclamation"></i> Network error. Please check your connection and try again.';
            }
          });
      }
    });

    function showError(inputElement) {
      inputElement.closest('.form-group')?.classList.add('has-error');
    }

    function clearError(inputElement) {
      inputElement.closest('.form-group')?.classList.remove('has-error');
    }

    // Clear errors on typing
    ['userName', 'userEmail', 'userMessage'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', () => clearError(input));
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. DYNAMIC COPYRIGHT YEAR
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 10. UTILITY HELPERS
  // --------------------------------------------------------------------------
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
});
