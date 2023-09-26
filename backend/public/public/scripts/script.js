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
  console.log('fix body');
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
function openCallBackPopUp() {
  let popupForm = document.querySelector('.js-popup-form');
  if (popupForm) {
    popupForm.classList.add('popup__wrapper_active');
    fixBody();
  }
}
function closePopup() {
  let activeFormPopup = document.querySelector('.popup__wrapper_active');
  if (activeFormPopup) {
    activeFormPopup.classList.remove('popup__wrapper_active');
    removeFixBody();
  }
}
function checkCheckbox(formNode) {
  let checkbox = formNode.querySelector('.checkbox');
  let checkboxParentNode = checkbox.parentNode;
  if (checkbox.checked) {
    if (checkboxParentNode.classList.contains('error')) {
      checkboxParentNode.classList.remove('error');
    }
    return true;
  } else {
    checkboxParentNode.classList.add('error');
  }
}
function validateForm(formForValidation) {
  if (checkCheckbox(formForValidation)) {
    return true;
  }
}
function showThanksPopup() {
  document.querySelector('.js-popup-thanks').classList.add('popup__wrapper_active');
  fixBody();
  setTimeout(closePopup, 3000);
}
function submitForm(formNode) {
  formNode.querySelectorAll('input').forEach(input => {
    input.value = '';
  });
  if (formNode.querySelector('textarea')) {
    formNode.querySelector('textarea').value = '';
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const div = document.querySelector('.popup__container');
  document.addEventListener('click', e => {
    const withinBoundaries = e.composedPath().includes(div);
    const openButton = e.composedPath().includes(document.querySelector('.js-button-call-form'));
    if (!withinBoundaries && !openButton) {
      closePopup();
    }
  });
  document.querySelector('.js-header-mobile-menu-button').addEventListener('click', showMobileMenu);
  document.querySelector('.js-close-mobile-menu').addEventListener('click', closeMobileMenu);
  const tuningSwiper = new Swiper('.js-tuning-swiper', {
    slidesPerView: 1.1,
    spaceBetween: 10,
    loop: false,
    centeredSlides: false
  });
  document.querySelectorAll('.js-button-call-form').forEach(button => {
    button.addEventListener('click', openCallBackPopUp);
  });
  document.querySelectorAll('.js-popup-close-button').forEach(btn => {
    btn.addEventListener('click', closePopup);
  });
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (validateForm(form)) {
        if (true) {
          //сюда вставлять валидацию на бота - всё упаковать в отдельную функцию с возможным появлением 2й рекапчи
          console.log('submit');
          submitForm(form);
          if (document.querySelector('.popup__wrapper_active')) {
            closePopup();
          }
          showThanksPopup();
        }
      }
    });
  });
});