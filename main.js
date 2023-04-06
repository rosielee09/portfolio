'use strict';

// navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// navbar click scroll down to id
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('drop');
  scrollIntoView(link);
});

// navbar toggle btn for small screen
const navbarToggle = document.querySelector('.navbar__toggle-btn');
navbarToggle.addEventListener('click', (event) => {
  navbarMenu.classList.toggle('drop');
});

// handle click on "talk me" button on home
const contact = document.querySelector('.home__contact');
contact.addEventListener('click', (event) => {
  scrollIntoView('#contact');
});

// when scroll, home&contact  fade out

const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
const contactBtn = document.querySelector('.home__contact');
document.addEventListener('scroll', () => {
  contactBtn.style.opacity = 1 - window.scrollY / homeHeight;
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// when mouse on contact btn - recover opacity
contactBtn.addEventListener('mouseenter', (e) => {
  contactBtn.style.opacity = 1;
});

// when mouse off contact btn - lose opacity
contactBtn.addEventListener('mouseleave', (e) => {
  contactBtn.style.opacity = 1 - window.scrollY / homeHeight;
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}

// When the user scrolls down 20px, show the button

const upBtn = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  upBtn.classList.toggle('visible', document.documentElement.scrollTop > 20);
});

// When the user clicks on the button, scroll to the top of the document
upBtn.addEventListener('click', () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
// when click butn, filter by category
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  //remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === '*' || filter === project.dataset.type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });
    projectContainer.classList.remove('anim-out');
  }, 300);
});
