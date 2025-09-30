// src/utils.js
// Minimal helper lib for working with Custom Elements (WebComponents)
// No frameworks. Exports small utilities: createCE, updateCE.
 
function isObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/**
 * setProperties: set JS properties on element (not attributes).
 * Use for objects like hass, stateObj, etc. e.g. el.hass = hass
 */
function setProperties(el, props = {}) {
  Object.keys(props).forEach((k) => {
    try {
      // property assignment preferred for webcomponents that expect real objects
      el[k] = props[k];
    } catch (e) {
      // fallback to dataset or attribute if property assignment fails
      try {
        el.setAttribute(k, String(props[k]));
      } catch (_) {}
    }
  });
}

/**
 * setAttributes: set HTML attributes on element
 */
function setAttributes(el, attrs = {}) {
  Object.keys(attrs).forEach((k) => {
    const val = attrs[k];
    if (val === false || val == null) {
      el.removeAttribute(k);
    } else if (val === true) {
      el.setAttribute(k, "");
    } else {
      el.setAttribute(k, String(val));
    }
  });
}

/**
 * setStyles: set HTML style Property on element
 */
function setCssVars(el, styles = {}) {
  Object.keys(styles).forEach((k) => {
    const val = styles[k];
    if (val === false || val == null) {
      el.removeProperty(k);
    } else {
      el.setProperty(k, String(val));
    }
  });
}

/**
 * createCE - create a custom element easily
 *
 * options = {
 *   props: { hass, stateObj, open: true, ... }    // assigned as properties
 *   attrs: { id: 'mydialog', slot: 'start', role: 'button' } // set as attributes
 *   slotName: 'start' // optional: will set el.slot = slotName
 * }
 */
function createCE(tag, options = {}) {
  const {
    props = {},
    attrs = {},
    slotName = null,
    style = {},
    cssVars = {},
    text = "",
  } = options;

  const el = document.createElement(tag);

  if (slotName) el.slot = slotName;

  if (text) el.innerText = text;

  // attributes
  setAttributes(el, attrs);

  // properties
  setProperties(el, props);

  if (style) {
    Object.assign(el.style, style);
  }

  setCssVars(el.style, cssVars);

  return el;
}

/**
 * updateCE - update props and attributes on an existing element
 * safer updates: only updates keys present in passed objects
 */
function updateCE(
  el,
  { props = {}, attrs = {}, style = {}, cssVars = {}, text = "" } = {}
) {
  if (el == null) return el;
  if (attrs && Object.keys(attrs).length) setAttributes(el, attrs);
  if (props && Object.keys(props).length) setProperties(el, props);
  if (style && Object.keys(style).length) setStyles(el, style);
  if (text) el.innerText = text;
  if (cssVars && Object.keys(cssVars).length) setCssVars(el.style, cssVars);

  return el;
}

export { createCE, updateCE };
