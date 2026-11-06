import './styles/styles.css';
import { Game } from './core/Game.js';
import { renderStyleguide } from './ui/Styleguide.js';
import { showError, webglAvailable } from './ui/ErrorScreen.js';
import { mountGamesMenu } from './shared/GamesMenu.js';

const params = new URLSearchParams(window.location.search);
const uiRoot = document.getElementById('ui-root');
const canvas = document.getElementById('game-canvas');

function boot() {
  if (params.has('styleguide')) {
    canvas.style.display = 'none';
    renderStyleguide(uiRoot);
    return;
  }
  if (!webglAvailable(params)) {
    showError(uiRoot, {
      title: 'WebGL not available',
      message: 'APEX GP needs WebGL to draw the 3D track. Enable hardware acceleration in your browser settings, update your graphics drivers, or try a recent Chrome, Edge or Firefox.',
      actions: [{ label: 'Try again', onClick: () => window.location.reload() }],
    });
    return;
  }
  const game = new Game({ canvas, uiRoot, params });
  window.__game = params.has('debug') ? game : undefined;
  try {
    game.init();
  } catch (err) {
    game.fail('Something went wrong', 'APEX GP failed to start. Reloading usually fixes it.', err);
  }
  // shared "Games" side menu (switch to GUST CREW); only on menu screens
  const MENU_PHASES = new Set(['menu', 'garage', 'select', 'results', 'paused', 'error']);
  mountGamesMenu({ current: 'apex', isAllowed: () => MENU_PHASES.has(game.store.phase) });
}

boot();
