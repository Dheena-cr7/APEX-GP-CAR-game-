import './styles/gust.css';
import { Game } from './core/Game.js';
import { mountGamesMenu } from '../shared/GamesMenu.js';

const params = new URLSearchParams(window.location.search);
const uiRoot = document.getElementById('ui-root');
const canvas = document.getElementById('game-canvas');

function webglOK() {
  if (params.has('nowebgl')) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function boot() {
  let game = null;
  // the games side menu shows on menus and results, never over the raft
  mountGamesMenu({
    current: 'gust',
    isAllowed: () => {
      if (!game || !game.ui) return true;
      if (!game.ui.modalEl.hidden || game.loading) return false;
      return !game.race || game.ui.current === 'results' || game.ui.current === 'pause';
    },
  });
  if (!webglOK()) {
    uiRoot.innerHTML = `<div class="gc-ui"><div class="gc-screen"><div class="gc-panel-wrap"><div class="gc-card gc-errorcard">
      <h2>WebGL is not available</h2>
      <p>GUST CREW needs WebGL to draw the river. Turn on hardware acceleration in your browser settings, update your graphics drivers, or try a recent Chrome, Edge, Firefox or Safari.</p>
      <div class="gc-menu gc-menu-row"><button class="gc-btn gc-btn-primary" onclick="location.reload()">Try again</button></div>
    </div></div></div></div>`;
    return;
  }
  game = new Game({ canvas, uiRoot, params });
  try {
    game.init();
  } catch (err) {
    console.error(err);
    if (game.ui) game.fail('Something went wrong', 'GUST CREW failed to start. Reloading usually fixes it.', err);
  }
}

boot();
