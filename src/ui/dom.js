// Tiny DOM helpers shared by every UI module.

/**
 * Create an element. `props` supports className, text, html-free children,
 * dataset, attrs, style, and on<Event> handlers.
 */
export function h(tag, props = {}, children = []) {
  const el = document.createElement(tag);
  for (const key in props) {
    const value = props[key];
    if (value === undefined || value === null || value === false) continue;
    if (key === 'className') el.className = value;
    else if (key === 'text') el.textContent = value;
    else if (key === 'dataset') Object.assign(el.dataset, value);
    else if (key === 'style') Object.assign(el.style, value);
    else if (key === 'attrs') {
      for (const a in value) {
        if (value[a] !== undefined && value[a] !== null && value[a] !== false) el.setAttribute(a, value[a] === true ? '' : String(value[a]));
      }
    } else if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el[key] = value;
    }
  }
  append(el, children);
  return el;
}

export function append(el, children) {
  if (children === undefined || children === null || children === false) return el;
  if (Array.isArray(children)) {
    for (const c of children) append(el, c);
  } else if (children instanceof Node) {
    el.appendChild(children);
  } else {
    el.appendChild(document.createTextNode(String(children)));
  }
  return el;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

/** Write text only when it changed (no layout work on unchanged frames). */
export function setText(el, value) {
  const str = String(value);
  if (el.__text !== str) {
    el.__text = str;
    el.textContent = str;
  }
}

/** Toggle a class only when the state changes. */
export function setClass(el, cls, on) {
  const key = '__c_' + cls;
  if (el[key] !== on) {
    el[key] = on;
    el.classList.toggle(cls, on);
  }
}

export function setStyle(el, prop, value) {
  const key = '__s_' + prop;
  if (el[key] !== value) {
    el[key] = value;
    el.style[prop] = value;
  }
}
