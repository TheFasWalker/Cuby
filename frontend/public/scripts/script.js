function scrollbarWidth() {
  var documentWidth = parseInt(document.documentElement.clientWidth);
  var windowsWidth = parseInt(window.innerWidth);
  var scrollbarWidth = windowsWidth - documentWidth;
  return scrollbarWidth;
}
function fixBody() {
  let body = document.querySelector('body');
  let paddingRightt = scrollbarWidth();
  let header = document.querySelector('.header__button');
  body.style.overflow = 'hidden';
  body.style.paddingRight = `${paddingRightt}px`;
  header.style.marginRight = `${paddingRightt}px`;
}
function removeFixBody() {
  document.querySelector('body').style.overflow = '';
  document.querySelector('body').style.paddingRight = '';
  document.querySelector('.header__button').style.marginRight = '';
}
function showMobileMenu() {
  document.querySelector('.mobile-menu__wrapper').classList.add('mobile-menu__wrapper_active');
  fixBody();
}
function closeMobileMenu() {
  let activeMobileMenu = document.querySelector('.mobile-menu__wrapper_active');
  if (activeMobileMenu) {
    activeMobileMenu.classList.remove('mobile-menu__wrapper_active');
    removeFixBody();
  }
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.js-header-mobile-menu-button').addEventListener('click', showMobileMenu);
  document.querySelector('.js-close-mobile-menu').addEventListener('click', closeMobileMenu);
});