(function () {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  const revealElements = document.querySelectorAll(
    '.hero, .features, .about, .cta, .footer'
  );

  function isInView(el) {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight - 80;
  }

  function checkReveals() {
    revealElements.forEach(el => {
      el.classList.add('reveal');
      if (isInView(el)) {
        el.classList.add('visible');
      }
    });
  }

  checkReveals();
  window.addEventListener('scroll', checkReveals);

  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    const heroSection = document.querySelector('.hero');
    if (!heroSection || !isInView(heroSection)) return;

    countersAnimated = true;
    statNumbers.forEach(counter => {
      const target = parseFloat(counter.dataset.target) || 0;
      const duration = 2000;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
        }
      }

      requestAnimationFrame(update);
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  const ctaButton = document.getElementById('ctaButton');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      openChat();
    });
  }

  const tryItBtn = document.getElementById('tryItBtn');
  if (tryItBtn) {
    tryItBtn.addEventListener('click', e => {
      e.preventDefault();
      openChat();
    });
  }

  document.querySelector('.hero-content')?.addEventListener('mousemove', e => {
    const rect = document.querySelector('.hero-content').getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -4;
    const ry = ((x - cx) / cx) * 4;
    document.querySelector('.hero-content').style.setProperty('--rx', rx + 'deg');
    document.querySelector('.hero-content').style.setProperty('--ry', ry + 'deg');
  });

  document.querySelector('.hero-content')?.addEventListener('mouseleave', () => {
    document.querySelector('.hero-content').style.setProperty('--rx', '0deg');
    document.querySelector('.hero-content').style.setProperty('--ry', '0deg');
  });

  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      card.style.setProperty('--rx', rotateX + 'deg');
      card.style.setProperty('--ry', rotateY + 'deg');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

  document.querySelectorAll('.about-image-placeholder').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      el.style.setProperty('--rx', rotateX + 'deg');
      el.style.setProperty('--ry', rotateY + 'deg');
    });

    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  });



  function openChat() {
    if (!chatPanel || !chatFab || !chatOverlay) return;
    chatOverlay.classList.add('active');
    chatPanel.classList.add('active');
    chatFab.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeChat() {
    if (!chatPanel || !chatFab || !chatOverlay) return;
    chatPanel.classList.remove('active');
    chatFab.classList.remove('active');
    chatOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (chatFab) {
    chatFab.addEventListener('click', function (e) {
      e.stopPropagation();
      if (chatPanel.classList.contains('active')) {
        closeChat();
      } else {
        openChat();
      }
    });
  }

  if (chatPanelClose) {
    chatPanelClose.addEventListener('click', function (e) {
      e.stopPropagation();
      closeChat();
    });
  }

  if (chatOverlay) {
    chatOverlay.addEventListener('click', function (e) {
      e.stopPropagation();
      closeChat();
    });
  }

  document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && chatPanel && chatPanel.classList.contains('active')) {
    closeChat();
  }
});

  let panelTiltActive = false;

  function enablePanelTilt() {
    if (panelTiltActive) return;
    panelTiltActive = true;
    const header = chatPanel.querySelector('.chat-panel-header');
    if (!header) return;

    header.addEventListener('mousemove', function (e) {
      if (!chatPanel.classList.contains('active')) return;
      const rect = chatPanel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * -3;
      const ry = ((x - cx) / cx) * 3;
      chatPanel.style.setProperty('--tilt-rx', rx + 'deg');
      chatPanel.style.setProperty('--tilt-ry', ry + 'deg');
    });

    header.addEventListener('mouseleave', function () {
      chatPanel.style.setProperty('--tilt-rx', '0deg');
      chatPanel.style.setProperty('--tilt-ry', '0deg');
    });
  }

  if (chatPanel) {
    enablePanelTilt();
  }

  const shapes = document.querySelectorAll('.shape');
  function parallaxShapes() {
    const scrollY = window.scrollY;
    shapes.forEach((shape, i) => {
      const speed = 0.02 + (i * 0.01);
      shape.style.marginTop = (scrollY * speed) + 'px';
    });
  }
  window.addEventListener('scroll', parallaxShapes);
})();
