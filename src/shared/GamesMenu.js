// Shared "Games" side menu: a small button that opens a drawer listing every
// game on the site, so players can switch between APEX GP and GUST CREW.
// Both pages mount it; `isAllowed()` hides the button during gameplay so it
// never covers a HUD.

import './games-menu.css';

const GAMES = [
  {
    id: 'apex',
    title: 'APEX GP',
    tag: 'Racing · Drift · 1–6 players',
    blurb: 'Low-poly formula racing with nitro drifts, a campaign and online races.',
    href: { apex: './', gust: '../' },
  },
  {
    id: 'gust',
    title: 'GUST CREW',
    tag: 'Co-op raft · Physics · 1–4 players',
    blurb: 'Blast your raft down wild rivers together. Where you stand decides where it turns.',
    href: { apex: './gust/', gust: './' },
  },
];

/**
 * @param {{ current: 'apex'|'gust', isAllowed?: () => boolean, onOpen?: () => void, onClose?: () => void }} opts
 */
export function mountGamesMenu({ current, isAllowed = () => true, onOpen, onClose } = {}) {
  const root = document.createElement('div');
  root.className = 'gm-root';
  root.dataset.game = current;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'gm-toggle';
  toggle.setAttribute('aria-label', 'Open games menu');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<span class="gm-burger" aria-hidden="true"><i></i><i></i><i></i></span><span class="gm-toggle-label">Games</span>';

  const scrim = document.createElement('div');
  scrim.className = 'gm-scrim';

  const drawer = document.createElement('nav');
  drawer.className = 'gm-drawer';
  drawer.setAttribute('aria-label', 'Games');
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <div class="gm-head">
      <span class="gm-head-title">Games</span>
      <button type="button" class="gm-close" aria-label="Close games menu">×</button>
    </div>
    <ul class="gm-list">
      ${GAMES.map((g) => `
        <li>
          <a class="gm-card gm-card-${g.id}${g.id === current ? ' is-current' : ''}" href="${g.href[current]}" ${g.id === current ? 'aria-current="page"' : ''}>
            <span class="gm-thumb gm-thumb-${g.id}" aria-hidden="true"></span>
            <span class="gm-text">
              <span class="gm-title">${g.title}${g.id === current ? '<span class="gm-now">Playing</span>' : ''}</span>
              <span class="gm-tag">${g.tag}</span>
              <span class="gm-blurb">${g.blurb}</span>
            </span>
          </a>
        </li>`).join('')}
    </ul>
    <p class="gm-foot">More games coming soon.</p>`;

  root.append(toggle, scrim, drawer);
  document.body.appendChild(root);

  let open = false;
  const links = () => [...drawer.querySelectorAll('a, button')];

  function set(v) {
    if (open === v) return;
    open = v;
    root.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    drawer.setAttribute('aria-hidden', String(!open));
    for (const el of links()) el.tabIndex = open ? 0 : -1;
    if (open) {
      const cur = drawer.querySelector('.gm-card:not(.is-current)') || drawer.querySelector('.gm-close');
      setTimeout(() => cur && cur.focus(), 30);
      if (onOpen) onOpen();
    } else {
      if (document.activeElement && drawer.contains(document.activeElement)) toggle.focus();
      if (onClose) onClose();
    }
  }
  for (const el of links()) el.tabIndex = -1;

  toggle.addEventListener('click', () => set(!open));
  scrim.addEventListener('click', () => set(false));
  drawer.querySelector('.gm-close').addEventListener('click', () => set(false));
  // the games' own menus listen to keys too: while the drawer is open it owns
  // the keyboard (capture phase, stops the event reaching the game)
  window.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') {
      set(false);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const list = links();
      const i = list.indexOf(document.activeElement);
      const n = list[(i + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length];
      if (n) n.focus();
      e.preventDefault();
    } else if (e.key === 'Enter' && document.activeElement && drawer.contains(document.activeElement)) {
      return; // let the link / button handle it
    }
    e.stopPropagation();
  }, true);

  // show the button only where the game says it is safe (menus, results)
  let shown = null;
  function refresh() {
    const allowed = !!isAllowed();
    if (allowed !== shown) {
      shown = allowed;
      root.classList.toggle('is-hidden', !allowed);
      if (!allowed) set(false);
    }
  }
  refresh();
  const timer = setInterval(refresh, 250);

  return {
    refresh,
    close: () => set(false),
    get isOpen() {
      return open;
    },
    dispose() {
      clearInterval(timer);
      root.remove();
    },
  };
}
