const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const selected = button.dataset.filter;
  projects.forEach(card => {
    card.classList.toggle('hidden', selected !== 'all' && card.dataset.category !== selected);
  });
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));
document.querySelector('#year').textContent = new Date().getFullYear();

const progress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
}, { passive: true });

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
const activeNavObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active-link', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => activeNavObserver.observe(section));

const toast = document.querySelector('.placeholder-toast');
let toastTimer;
document.querySelectorAll('.placeholder-link').forEach(link => link.addEventListener('click', event => {
  if (link.getAttribute('href') === '#') {
    event.preventDefault();
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }
}));
