const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('main > section:not(.hero), main > .grid, .panel');
  revealTargets.forEach((target) => target.classList.add('hb-reveal'));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('hb-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });

  revealTargets.forEach((target) => revealObserver.observe(target));
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target === '_blank' || link.hasAttribute('download')) return;

  const destination = new URL(link.href, window.location.href);
  const isWebLink = destination.protocol === 'http:' || destination.protocol === 'https:';
  if (!isWebLink || destination.origin !== window.location.origin) return;

  const samePage = destination.pathname === window.location.pathname && destination.search === window.location.search;
  if (samePage && destination.hash) {
    const target = document.querySelector(destination.hash);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    history.pushState(null, '', destination.hash);
    target.classList.remove('hb-section-focus');
    requestAnimationFrame(() => target.classList.add('hb-section-focus'));
    return;
  }

  if (!samePage) {
    event.preventDefault();
    document.body.classList.add('hb-page-leaving');
    window.setTimeout(() => window.location.assign(destination.href), reducedMotion ? 0 : 170);
  }
});
