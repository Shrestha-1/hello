// Helper to toggle body scroll
const toggleBodyScroll = disable => document.body.classList.toggle('no-scroll', disable);

// Generic open/close overlay functions
function openOverlay(overlay, toggleBtn) {
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
  toggleBodyScroll(true);
  overlay.focus();
}

function closeOverlay(overlay, toggleBtn) {
  overlay.classList.remove('active');
  overlay.setAttribute('aria-hidden', 'true');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBodyScroll(false);
  if (toggleBtn) toggleBtn.focus();
}

// Generic toggle on click or keyboard (Enter/Space)
function addToggleListener(btn, openFn, closeFn) {
  btn.addEventListener('click', openFn);
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openFn();
    }
  });
  // If there's a close button paired:
  if (closeFn) {
    closeFn.btn.addEventListener('click', closeFn.fn);
    closeFn.btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeFn.fn();
      }
    });
  }
}

// Elements
const hamburgerMenu = document.getElementById('hamburgerMenu');

const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');

const shareIcon = document.getElementById('shareIcon');
const shareOverlay = document.getElementById('shareOverlay');
const closeShare = document.getElementById('closeShare');

const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartBackground = document.getElementById('cartBackground');

const moreMenu = document.getElementById('moreMenu');
const mainNav = document.querySelector('.main-nav');
const dropdown = document.querySelector('.dropdown');
const links = ['topupLink', 'walletLink', 'offersLink', 'supportLink', 'contactLink'].map(id => document.getElementById(id));
const moreToggle = document.getElementById('moreToggle');

// Search Toggle (special case)
function toggleSearch() {
  const active = searchInput.classList.toggle('active');
  searchInput.setAttribute('aria-hidden', !active);
  searchToggle.setAttribute('aria-expanded', active);
  if (active) searchInput.focus();
  else searchInput.value = '';
}
searchToggle.addEventListener('click', toggleSearch);
searchToggle.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleSearch();
  }
});

// Share Overlay
addToggleListener(shareIcon, () => openOverlay(shareOverlay, shareIcon), { btn: closeShare, fn: () => closeOverlay(shareOverlay, shareIcon) });

// Cart Overlay (with background click to close)
addToggleListener(cartIcon, () => {
  openOverlay(cartOverlay, cartIcon);
  cartBackground.classList.add('active');
}, { btn: closeCart, fn: () => {
  closeOverlay(cartOverlay, cartIcon);
  cartBackground.classList.remove('active');
}});

cartBackground.addEventListener('click', () => {
  closeOverlay(cartOverlay, cartIcon);
  cartBackground.classList.remove('active');
});

// Responsive Nav logic for "More" menu links
function moveToNav(link) {
  if (link.parentElement !== mainNav) mainNav.insertBefore(link, dropdown);
}

function moveToDropdown(link) {
  if (link.parentElement !== moreMenu) moreMenu.appendChild(link);
}

function responsiveNavUpdate() {
  const w = window.innerWidth;

  if (w < 615) {
    links.forEach(moveToNav);
  } else {
    const breakpoints = [710, 760, 840, 910, 1010];
    links.forEach((link, i) => (w < breakpoints[i] ? moveToDropdown(link) : moveToNav(link)));
  }
}

window.addEventListener('resize', responsiveNavUpdate);
window.addEventListener('DOMContentLoaded', responsiveNavUpdate);

// More dropdown toggle
moreToggle.addEventListener('click', () => {
  const isShown = moreMenu.classList.toggle('show');
  moreToggle.setAttribute('aria-expanded', isShown);
});

document.addEventListener('click', e => {
  if (!moreToggle.contains(e.target) && !moreMenu.contains(e.target)) {
    moreMenu.classList.remove('show');
    moreToggle.setAttribute('aria-expanded', 'false');
  }
});

// Hamburger menu toggle
hamburgerMenu.addEventListener('click', () => {
  const active = mainNav.classList.toggle('mobile-active');
  document.body.classList.toggle('no-scroll', active);
});

// Close overlays on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (shareOverlay.classList.contains('active')) closeOverlay(shareOverlay, shareIcon);
    if (cartOverlay.classList.contains('active')) {
      closeOverlay(cartOverlay, cartIcon);
      cartBackground.classList.remove('active');
    }
  }
});
// Dummy example: Replace this logic with real auth check
function isUserLoggedIn() {
  // Example: You might check a token or session storage
  return localStorage.getItem('loggedIn') === 'true';
}

// Click event on account icon
document.addEventListener('DOMContentLoaded', function () {
  const accountIcon = document.getElementById('accountIcon');

  if (accountIcon) {
    accountIcon.addEventListener('click', function () {
      console.log("Account icon clicked");

      if (isUserLoggedIn()) {
        window.location.href = 'profile.html';
      } else {
        window.location.href = 'login.html';
      }
    });
  } else {
    console.error("Account icon not found");
  }
});
