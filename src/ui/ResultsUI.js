import { h } from './dom.js';
import { Button } from './components/Button.js';
import { Badge } from './components/Badge.js';
import { Panel } from './components/Panel.js';
import { Stat } from './components/Stat.js';
import { StarRating } from './components/StarRating.js';
import { HazardBand } from './components/HazardBand.js';
import { LEVELS, getLevel, levelTarget, isLevelUnlocked } from '../race/Campaign.js';
import { formatTime } from '../race/LapTimer.js';
import { medalName } from '../race/Scoring.js';
import { modeLabel } from './RaceHUD.js';

/**
 * Results screen: big display title, stars (campaign), stats row,
 * standings or lap table, unlocks, and Race again / Next level / Menu.
 * Enter = Race again.
 */
export function renderResults(ui, state) {
  const res = state.results || ui.game.lastResults || {};
  const race = ui.game.race;
  const cfg = race ? race.config : {};
  const level = cfg.levelId ? getLevel(cfg.levelId) : null;
  const net = ui.game.net;
  const online = !!res.online && !!net;
  let again;
  if (online) {
    // online: the host starts the next race from the lobby; everyone can go back to it
    again = Button({ label: 'Back to lobby', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => {
      if (net.isHost) net.backToLobby();
      ui._go('select', { screen: 'lobby' });
    } });
  } else again = Button({ label: 'Race again', variant: 'primary', size: 'lg', hotkey: 'Enter', onClick: () => ui._restart() });
  again.dataset.autofocus = '';
  ui.primary = again;
  ui.back = () => ui._go('menu', { screen: 'main' });
  let title;
  let sub;
  if (res.timedOut) {
    title = 'Time up';
    sub = 'The clock ran out before the finish.';
  } else if (res.multi && res.mode === 'drift' && res.driftScores) {
    const best = res.driftScores.slice().sort((a, b) => b.score - a.score)[0];
    title = `${best.name} wins`;
    sub = `${best.score} drift points`;
  } else if (res.multi && res.mode === 'grandprix' && !res.online && res.winner) {
    title = `${res.winner} wins`;
    sub = 'Best placed driver';
  } else if (res.mode === 'grandprix') {
    title = `P${res.position}`;
    sub = res.position <= 3 ? `${medalName(res.position)} medal` : `Finished ${ordinal(res.position)} of ${res.rows.length}`;
  } else if (res.mode === 'drift') {
    title = `${res.driftScore}`;
    sub = 'Drift points';
  } else if (res.mode === 'timeattack' || res.mode === 'timetrial') {
    title = formatTime(res.bestLap);
    sub = 'Best lap';
  } else {
    title = res.ended ? 'Session over' : 'Finish';
    sub = res.lapTimes && res.lapTimes.length ? `${res.lapTimes.length} timed laps` : 'No timed laps';
  }
  const rec = res.records || {};
  const stats = [
    Stat({ label: 'Total', value: res.mode === 'practice' ? '—' : formatTime(res.totalTime + (res.penalty || 0)), size: 'md' }),
    Stat({ label: 'Best lap', value: formatTime(res.bestLap), size: 'md', className: rec.bestLap ? 'stat--good' : '' }),
    Stat({ label: 'Drift', value: String(res.driftScore || 0), size: 'md', className: rec.drift && res.mode === 'drift' ? 'stat--good' : '' }),
    res.tokensTotal ? Stat({ label: 'Tokens', value: `${res.tokens}/${res.tokensTotal}`, size: 'md' }) : null,
    res.penalty ? Stat({ label: 'Penalties', value: `+${res.penalty.toFixed(1)}s`, size: 'md', className: 'stat--warn' }) : null,
  ];
  const badges = [];
  if (rec.bestLap) badges.push(Badge({ label: 'New best lap', tone: 'good' }));
  if (rec.drift && res.driftScore > 0) badges.push(Badge({ label: 'New drift record', tone: 'good' }));
  if (res.stars > res.previousStars) badges.push(Badge({ label: `+${res.stars - res.previousStars} ★`, tone: 'good' }));
  for (const u of res.newUnlocks || []) badges.push(Badge({ label: `Unlocked ${u.type}: ${u.name}`, tone: 'info' }));
  let table = res.rows && res.rows.length > 1 ? standings(res.rows) : lapTable(res.lapTimes || []);
  if (res.driftScores && res.mode === 'drift') {
    const sorted = res.driftScores.slice().sort((a, b) => b.score - a.score);
    table = h('table', { className: 'standings' }, [
      h('thead', {}, [h('tr', {}, [h('th', { text: 'Pos' }), h('th', { text: 'Driver' }), h('th', { text: 'Drift points' })])]),
      h('tbody', {}, sorted.map((d, i) => h('tr', { className: i === 0 ? 'is-best' : '' }, [h('td', { text: String(i + 1) }), h('td', { text: d.name }), h('td', { text: String(d.score) })]))),
    ]);
  }
  let next = null;
  if (level) {
    const nl = LEVELS[level.index + 1];
    if (nl && isLevelUnlocked(ui.game.save.data, nl)) next = Button({ label: 'Next level', variant: 'secondary', size: 'md', onClick: () => ui._startLevel(nl) });
  }
  const target = level ? levelTarget(level) : null;
  ui._screen('screen--results', [
    Panel({
      raised: true,
      className: 'results',
      children: [
        h('div', { className: 't-label-sm t-secondary', text: `${modeLabel(res.mode)} · ${res.circuitName || ''}${level ? ` · Level ${level.index + 1}` : ''}` }),
        h('div', { className: 'results__head' }, [
          h('div', {}, [h('h1', { className: 't-hero results__title', text: title }), h('div', { className: 't-label t-secondary', text: sub })]),
          level ? h('div', { className: 'results__stars' }, [StarRating({ value: res.stars || 0, size: 'lg' }), h('div', { className: 't-label-xs t-secondary', text: starHint(target) })]) : null,
        ]),
        HazardBand({}),
        h('div', { className: 'results__stats' }, stats),
        badges.length ? h('div', { className: 'results__badges' }, badges) : null,
        table,
        h('div', { className: 'results__actions' }, [again, next, Button({ label: online ? 'Leave room' : 'Menu', variant: 'secondary', size: 'md', hotkey: 'Esc', onClick: () => ui._go('menu', { screen: 'main' }) })]),
      ],
    }),
  ]);
}

function standings(rows) {
  return h('table', { className: 'standings' }, [
    h('thead', {}, [h('tr', {}, ['Pos', 'Driver', 'Car', 'Time', 'Best'].map((x) => h('th', { text: x })))]),
    h(
      'tbody',
      {},
      rows.map((r, i) => {
        const gap = i === 0 ? formatTime(r.time) : `+${(r.time - rows[0].time).toFixed(3)}`;
        return h('tr', { className: r.isPlayer ? 'is-player' : '' }, [
          h('td', { text: String(r.position) }),
          h('td', { text: r.name }),
          h('td', { text: r.car }),
          h('td', { text: r.finished ? gap : `${gap} est.` }),
          h('td', { text: formatTime(r.best) }),
        ]);
      }),
    ),
  ]);
}

function lapTable(laps) {
  if (!laps.length) return null;
  const best = Math.min(...laps);
  return h('table', { className: 'standings' }, [
    h('thead', {}, [h('tr', {}, [h('th', { text: 'Lap' }), h('th', { text: 'Time' })])]),
    h('tbody', {}, laps.map((t, i) => h('tr', { className: t === best ? 'is-best' : '' }, [h('td', { text: String(i + 1) }), h('td', { text: formatTime(t) })]))),
  ]);
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function starHint(target) {
  if (!target) return '';
  if (target.type === 'position') return 'Top 3 earns stars';
  if (target.type === 'lap') return `3★ ${formatTime(target.gold)} · 2★ ${formatTime(target.silver)} · 1★ ${formatTime(target.bronze)}`;
  if (target.type === 'drift') return `3★ ${target.gold} · 2★ ${target.silver} · 1★ ${target.bronze}`;
  return '';
}
