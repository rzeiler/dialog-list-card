import { createCE, updateCE } from "./utils.js";
import { mdiClose } from '@mdi/js';

class DialogList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
  }

  set hass(hass) {
    this._hass = hass;
  }

  set config(config) {
    this._config = config;
  }

  connectedCallback() {}

  render() {
    this.dialog = createCE("ha-dialog", {
      props: {
        hideActions: true,
        scrimClickAction: true,
        escapeKeyAction: true,
      },
      cssVars: {
        "--vertical-align-dialog": "flex-start",
        "--dialog-surface-margin-top": "40px",
        "--dialog-content-padding": "0px",
        "--mdc-dialog-min-width": this.isWide ? "580px" : "90vw",
        "--mdc-dialog-max-width": this.isWide ? "580px" : "90vw",
        "--mdc-dialog-max-height": "calc(100% - 72px)",
      },
      attrs: {
        heading: "",
      },
    });

    const header = createCE("ha-dialog-header");
    const title = createCE("span", {
      attrs: {
        slot: "title",
      },
      text: this._config.dialog_title || this._config.title || "Dialog List",
    });
    header.appendChild(title);

    const closeBtn = createCE("ha-icon-button", {
      attrs: {
        slot: "navigationIcon",
        dialogAction: "cancel",
        label:`${this._hass.localize("ui.common.close")}`,
      },
      props: {
        path: mdiClose,
      },
    });

    header.appendChild(closeBtn);
    this.dialog.appendChild(header);

    this.dialog.addEventListener("closed", () => {
      this.shadowRoot.innerHTML = "";
    });

    this.shadowRoot.appendChild(this.dialog);

    this.list = createCE("ha-list");
    this.dialog.appendChild(this.list);

    this._config.entities.map((ent) => {
      const st = this._hass.states[ent];
      const listIitem = this.getListItem(ent);

      // Aktion aufrufen
      const call = () => this.serviceCall(listIitem.domain, ent);
      listIitem.addEventListener("click", call);
      listIitem.addEventListener("touchend", call);

      this.list.appendChild(listIitem);
    });
  }

  isWide() {
    return window.matchMedia("(min-width: 600px) and (min-height: 501px)")
      .matches;
  }

  serviceCall(domain, ent) {
    var action = "toggle";

    if (domain === "script") {
      action = "turn_on";
    } else if (domain === "scene") {
      action = "turn_on";
    }
    this._hass
      .callService(domain, action, {
        entity_id: ent.entity,
      })
      .then((d) => {
        console.log("then", d);
        this.dialog.remove();
      });
  }

  open() {
    this.render();
    this.dialog.open = !this.dialog.open;
  }

  getListItem(item) {
    const ent = typeof item === "string" ? item : item.entity;
    const st = this._hass.states[ent];
    if (!st) return;

    const listItem = createCE("ha-md-list-item", {
      props: {
        interactive: true,
        multiline: true,
      },
      attrs: {
        type: "button",
      },
    });

    const relativeTime = createCE("ha-relative-time", {
      props: {
        hass: this._hass,
        datetime: st?.attributes.last_triggered,
      },
      attrs: {
        slot: "supporting-text",
      },
    });

    listItem.appendChild(relativeTime);

    const headline = createCE("span", {
      attrs: {
        slot: "headline",
        datetime: st?.attributes.last_triggered,
      },
      text: item.title || st.attributes.friendly_name || ent,
    });
    listItem.appendChild(headline);

    const domain = ent.split(".")[0];
    listItem.domain = domain;

    const text = createCE("span", {
      attrs: {
        slot: "trailing-supporting-text",
      },
      text: domain,
    });
    listItem.appendChild(text);

    const stateIcon = createCE("ha-state-icon", {
      attrs: {
        slot: "start",
      },
      props: {
        hass: this._hass,
        stateObj: st,
      },
      cssVars: {
        "--mdc-icon-size": "28px",
      },
    });

    // Zum Container hinzufügen
    listItem.appendChild(stateIcon);

    return listItem;
  }
}

customElements.define("dialog-list", DialogList);
