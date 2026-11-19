// Головний скрипт сайту: лише бургер-меню для телефонів.

// Знаходимо кнопку і список меню на сторінці
const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('main-menu');

// Якщо на сторінці немає меню (наприклад, Impressum) — нічого не робимо
if (menuButton && menu) {
  // Показуємо кнопку: без JavaScript вона схована, а меню видно завжди
  menuButton.hidden = false;

  // Допоміжні функції: відкрити / закрити меню
  function openMenu() {
    menuButton.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
  }

  function isMenuOpen() {
    return menuButton.getAttribute('aria-expanded') === 'true';
  }

  // 1. Клік по кнопці: перемикаємо стан (відкрите ↔ закрите)
  menuButton.addEventListener('click', () => {
    if (isMenuOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // 2. Клік по пункту меню: закриваємо меню (сторінка прокрутиться до розділу)
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  // 3. Клавіша Escape: закриваємо меню і повертаємо фокус на кнопку
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) {
      closeMenu();
      menuButton.focus();
    }
  });

  // 4. Клік будь-де поза меню і кнопкою: закриваємо меню
  document.addEventListener('click', (event) => {
    if (isMenuOpen() && !menuButton.contains(event.target) && !menu.contains(event.target)) {
      closeMenu();
    }
  });
}
