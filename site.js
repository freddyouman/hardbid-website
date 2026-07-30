const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const dialog = document.getElementById('price-dialog');

const priceTiers = {
  under5: { title: 'Under $5M project value', intro: 'Starting framework for the smallest project-value tier.', start: '$950', balance: '$950', total: '$1,900', offer: '$1,710' },
  '5to25': { title: '$5M–$25M project value', intro: 'Starting framework for projects valued from $5 million through $25 million.', start: '$1,500', balance: '$1,500', total: '$3,000', offer: '$2,700' },
  '25to100': { title: '$25M–$100M project value', intro: 'Starting framework for projects valued from $25 million through $100 million.', start: '$2,500', balance: '$2,500', total: '$5,000', offer: '$4,500' },
  over100: { title: 'Over $100M project value', intro: 'Starting framework for projects valued above $100 million.', start: '$4,000', balance: '$4,000', total: '$8,000', offer: '$7,200' }
};

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 18);
}

function closeMenu() {
  menu?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}

menuToggle?.addEventListener('click', () => {
  const willOpen = !menu?.classList.contains('open');
  menu?.classList.toggle('open', willOpen);
  menuToggle.setAttribute('aria-expanded', String(willOpen));
  menuToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (dialog?.open) closeDialog();
  }
});
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

document.querySelectorAll('[data-price-tier]').forEach((button) => {
  button.addEventListener('click', () => {
    const tier = priceTiers[button.dataset.priceTier];
    if (!tier || !dialog) return;
    dialog.querySelector('[data-dialog-title]').textContent = tier.title;
    dialog.querySelector('[data-dialog-intro]').textContent = tier.intro;
    dialog.querySelector('[data-dialog-start]').textContent = tier.start;
    dialog.querySelector('[data-dialog-balance]').textContent = tier.balance;
    dialog.querySelector('[data-dialog-total]').textContent = tier.total;
    dialog.querySelector('[data-dialog-offer]').textContent = tier.offer;
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

function closeDialog() {
  if (dialog?.open) dialog.close();
  document.body.classList.remove('dialog-open');
}

document.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', closeDialog));
dialog?.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) closeDialog();
});
dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

const hero = document.querySelector('.home-hero');
const heroFx = document.querySelector('[data-hero-fx]');
const heroWordmark = document.querySelector('.hero-wordmark');
const heroTitle = document.querySelector('.home-hero-title');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const heroReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero && heroFx && heroWordmark && heroTitle && finePointer.matches && !heroReducedMotion.matches) {
  let fxFrame = 0;
  let pendingPointer = null;

  const distanceToRect = (x, y, rect) => {
    const dx = x < rect.left ? rect.left - x : x > rect.right ? x - rect.right : 0;
    const dy = y < rect.top ? rect.top - y : y > rect.bottom ? y - rect.bottom : 0;
    return Math.hypot(dx, dy);
  };

  const writeHeroFx = (clientX, clientY, active = true) => {
    const heroRect = hero.getBoundingClientRect();
    const wordmarkRect = heroWordmark.getBoundingClientRect();
    const titleRect = heroTitle.getBoundingClientRect();
    const proximityDistance = Math.min(
      distanceToRect(clientX, clientY, wordmarkRect),
      distanceToRect(clientX, clientY, titleRect)
    );
    const rawNear = Math.max(0, 1 - proximityDistance / 360);
    const near = rawNear * rawNear * (3 - 2 * rawNear);
    const intensity = active ? near : 0;
    const x = Math.min(Math.max(clientX - heroRect.left, 0), heroRect.width);
    const y = Math.min(Math.max(clientY - heroRect.top, 0), heroRect.height);

    hero.style.setProperty('--fx-x', `${x.toFixed(1)}px`);
    hero.style.setProperty('--fx-y', `${y.toFixed(1)}px`);
    hero.style.setProperty('--fx-grid-size', `${(210 + intensity * 180).toFixed(1)}px`);
    hero.style.setProperty('--fx-ring-size', `${(118 + intensity * 174).toFixed(1)}px`);
    hero.style.setProperty('--fx-grid-opacity', `${(active ? .15 : .09) + intensity * .42}`);
    hero.style.setProperty('--fx-ring-opacity', `${(active ? .055 : .035) + intensity * .74}`);
    hero.style.setProperty('--fx-logo-scale', `${1 + intensity * .014}`);
    hero.style.setProperty('--fx-logo-glow', `${.12 + intensity * .48}`);
    hero.style.setProperty('--fx-title-glow', `${.04 + intensity * .34}`);
  };

  hero.addEventListener('pointermove', (event) => {
    pendingPointer = { x: event.clientX, y: event.clientY };
    if (fxFrame) return;
    fxFrame = window.requestAnimationFrame(() => {
      writeHeroFx(pendingPointer.x, pendingPointer.y, true);
      fxFrame = 0;
    });
  }, { passive: true });

  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--fx-grid-size', '210px');
    hero.style.setProperty('--fx-ring-size', '118px');
    hero.style.setProperty('--fx-grid-opacity', '.09');
    hero.style.setProperty('--fx-ring-opacity', '.035');
    hero.style.setProperty('--fx-logo-scale', '1');
    hero.style.setProperty('--fx-logo-glow', '.12');
    hero.style.setProperty('--fx-title-glow', '.04');
  }, { passive: true });

  window.requestAnimationFrame(() => {
    const targetRect = heroWordmark.getBoundingClientRect();
    writeHeroFx(targetRect.right + 150, targetRect.top + targetRect.height * .5, false);
  });
}
