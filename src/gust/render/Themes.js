// Visual themes: sky, light, water and land colours for each course.
// Colours are sRGB hex; three.js converts them to linear for lighting.

export const THEMES = {
  meadow: {
    skyTop: 0x2f86e0, skyHorizon: 0xcdeeff, skyGround: 0x9fcfb0,
    sunColor: 0xfff1d6, sunIntensity: 3.1, sunElev: 52, sunAzim: 35,
    hemiSky: 0xbfe3ff, hemiGround: 0x5d8a3a, hemiIntensity: 1.25,
    fog: 0xc9e8fb, fogNear: 70, fogFar: 330,
    deep: 0x0c6f7d, shallow: 0x46cbbf, foam: 0xf4fffd,
    land: { wet: 0x8f7d55, sand: 0xe0cd94, grass: 0x6fb64a, grass2: 0x4c9a3a, rock: 0x938f84, cliff: 0x7c7a70, snow: null },
    trees: ['broadleaf', 'broadleaf', 'birch'],
    treeDensity: 0.55,
    extras: ['flowers', 'reeds', 'boulders'],
    hills: 7, cliff: 0, mountains: 14,
    exposure: 1.0,
    music: { root: 60, bpm: 104, mode: 'major' },
  },
  forest: {
    skyTop: 0x3f7fc6, skyHorizon: 0xdbe9d3, skyGround: 0x7d9c7a,
    sunColor: 0xffdfae, sunIntensity: 2.9, sunElev: 34, sunAzim: -40,
    hemiSky: 0xc4ddd6, hemiGround: 0x3e5a2c, hemiIntensity: 1.15,
    fog: 0xc3d7cb, fogNear: 55, fogFar: 290,
    deep: 0x0b4e49, shallow: 0x3a957f, foam: 0xf2fbf6,
    land: { wet: 0x5e4e3a, sand: 0x86735a, grass: 0x557f37, grass2: 0x3f6b2c, rock: 0x7a766d, cliff: 0x6c675f, snow: null },
    trees: ['pine', 'pine', 'pine', 'broadleaf'],
    treeDensity: 0.85,
    extras: ['reeds', 'boulders', 'ferns', 'dust'],
    hills: 6, cliff: 11, mountains: 26,
    exposure: 1.0,
    music: { root: 57, bpm: 116, mode: 'minor' },
  },
  glacier: {
    skyTop: 0x5d9de4, skyHorizon: 0xeaf5ff, skyGround: 0xdde9f2,
    sunColor: 0xfff8ee, sunIntensity: 3.0, sunElev: 30, sunAzim: 60,
    hemiSky: 0xdcecff, hemiGround: 0x8fa3b5, hemiIntensity: 1.35,
    fog: 0xe0eefa, fogNear: 60, fogFar: 300,
    deep: 0x0d5d88, shallow: 0x67cbe8, foam: 0xffffff,
    land: { wet: 0x5d6873, sand: 0x9aa7b3, grass: 0xe9f1f7, grass2: 0xd7e5ef, rock: 0x6c7886, cliff: 0x5f6b79, snow: 0xf6faff },
    trees: ['pineSnow', 'pineSnow'],
    treeDensity: 0.4,
    extras: ['boulders', 'snow', 'iceChunks'],
    hills: 5, cliff: 9, mountains: 42,
    exposure: 0.95,
    music: { root: 62, bpm: 100, mode: 'lydian' },
  },
  canyon: {
    skyTop: 0x34488f, skyHorizon: 0xffb571, skyGround: 0xd98a5a,
    sunColor: 0xffb46e, sunIntensity: 3.2, sunElev: 14, sunAzim: -15,
    hemiSky: 0xffc9a0, hemiGround: 0x7a3a26, hemiIntensity: 1.1,
    fog: 0xeeb48a, fogNear: 60, fogFar: 300,
    deep: 0x1a5660, shallow: 0x4aa596, foam: 0xfff5ea,
    land: { wet: 0x6e3d2a, sand: 0xd9a066, grass: 0xc98655, grass2: 0xb46f45, rock: 0xb25a3b, cliff: 0x9c4a31, snow: null },
    trees: ['cactus', 'shrub', 'shrub'],
    treeDensity: 0.35,
    extras: ['boulders', 'dust', 'rainbow'],
    hills: 4, cliff: 15, mountains: 30,
    strata: true,
    exposure: 1.02,
    music: { root: 55, bpm: 120, mode: 'dorian' },
  },
};

export const CREW_COLORS = [
  { body: 0xff6f59, belly: 0xffd0bf, name: 'Coral' },
  { body: 0x2ec4b6, belly: 0xc9f5ef, name: 'Teal' },
  { body: 0xffc93c, belly: 0xfff0c2, name: 'Sunny' },
  { body: 0x8e6cf0, belly: 0xe2d8ff, name: 'Violet' },
];

export const CREW_CSS = ['#ff6f59', '#2ec4b6', '#ffc93c', '#8e6cf0'];
export const HATS = ['Sailor cap', 'Beanie', 'Tricorn', 'Straw hat'];
