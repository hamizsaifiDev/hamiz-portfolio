// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNavLink();
});

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-links');

function closeMobileMenu() {
  navMenu.classList.remove('open');
  hamburger.querySelector('i').className = 'fa fa-bars';
  document.body.classList.remove('no-scroll');
}

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  const icon = hamburger.querySelector('i');
  icon.classList.toggle('fa-bars');
  icon.classList.toggle('fa-times');
  document.body.classList.toggle('no-scroll', isOpen);
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ========== ACTIVE NAV LINK ==========
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

// ========== TYPING ANIMATION ==========
const typedEl = document.getElementById('typed');
const words = [
  'BCA 2nd Year Student',
  'C / C++ Developer',
  'DSA Enthusiast',
  'Aspiring Full Stack Dev',
  'Problem Solver 💡'
];
let wordIndex = 0, charIndex = 0, isDeleting = false, speed = 100;

function typeEffect() {
  const word = words[wordIndex];
  typedEl.textContent = isDeleting
    ? word.substring(0, charIndex - 1)
    : word.substring(0, charIndex + 1);

  isDeleting ? charIndex-- : charIndex++;
  speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === word.length) {
    isDeleting = true; speed = 1800;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 400;
  }
  setTimeout(typeEffect, speed);
}
typeEffect();

// ========== SCROLL REVEAL ==========
document.querySelectorAll(
  '.about-grid, .skill-card, .project-card, .step, .contact-grid, .section-title, .more-projects-msg'
).forEach(el => el.classList.add('reveal'));

document.querySelectorAll('.reveal').forEach(el => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 }).observe(el);
});

// ========== SKILLS TABS ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const tab = document.getElementById(btn.getAttribute('data-tab'));
    tab.classList.add('active');
    animateBars(tab);
  });
});

function animateBars(container) {
  container.querySelectorAll('.skill-fill').forEach(fill => {
    fill.style.width = '0%';
    setTimeout(() => { fill.style.width = fill.getAttribute('data-width') + '%'; }, 100);
  });
}

let skillsDone = false;
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !skillsDone) {
    skillsDone = true;
    animateBars(document.querySelector('.tab-content.active'));
  }
}, { threshold: 0.3 }).observe(document.getElementById('skills'));

// ========== COUNTER ANIMATION ==========
function countUp(el, target) {
  let n = 0;
  const step = Math.ceil(target / 60);
  const t = setInterval(() => {
    n += step;
    if (n >= target) { el.textContent = target + '+'; clearInterval(t); }
    else el.textContent = n + '+';
  }, 25);
}

let countersDone = false;
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersDone) {
    countersDone = true;
  }
}, { threshold: 0.4 }).observe(document.getElementById('about'));

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});


// ========== CONSOLE EASTER EGG ==========
console.log('%c👋 Hey there, fellow developer!', 'color:#ff2d78; font-size:16px; font-weight:bold;');
console.log('%cBCA 2nd Year → C/C++ Done → DSA In Progress → Full Stack Coming Soon! 🚀', 'color:#00d4ff; font-size:13px;');
console.log('%cLet\'s connect: linkedin.com/in/hamiz-saifi-aa3696383', 'color:#888aaa; font-size:12px;');