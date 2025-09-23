import { createCE, updateCE } from "./utils.js";
import "./dialog.js";

class DialogCard extends HTMLElement {
  setConfig(config) {
    //this.config = config || { title: "", entities: [] };

    this.config = {
      ...{
        title: "Services",
        icon: "mdi:unicorn",
        dialog_title: "Chose Service",
        state_on_entity: "",
        host: "",
        entities: [],
      },
      ...config,
    };
 

    this.render();
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    if (this.card) return;

    this.card = createCE("ha-card", {
      style: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: "5px 10px",
        cursor: "pointer",
      },
    });
    this.shadowRoot.appendChild(this.card);

    const background = createCE("div", {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "36px",
        height: "36px",
        borderRadius: "50px",
        overflow: "hidden",
        transition: "box-shadow 180ms ease-in-out",
        backgroundColor: "rgba(158,158,158,0.1)",
      },
    });
    this.card.appendChild(background);

    const stateIcon = createCE("ha-state-icon", {
      attrs: {
        icon: this.config.icon,
      },
      cssVars: {
        "--mdc-icon-size": "28px",
      },
    });
    background.appendChild(stateIcon);

    const haInfo = createCE("ha-info", {
      style: {
        padding: "5px 10px",
      },
    });
    this.card.appendChild(haInfo);

    const text = createCE("div", { text: this.config.title });
    haInfo.appendChild(text);

    let latestExecution = this._getLatestFromList(this.config.entities);

    if (this.config.entities === undefined || this.config.entities.length === 0) {
      latestExecution = Date.now();
    }

    const relativeTime = createCE("ha-relative-time", {
      props: {
        hass: this._hass,
        datetime: latestExecution,
      },
    });
    haInfo.appendChild(relativeTime);

    this.card.addEventListener("click", () => {
      this.dialog = createCE("dialog-list");
      this.shadowRoot.appendChild(this.dialog);
      this.dialog.config = this.config;
      this.dialog.hass = this._hass;
      this.dialog.open();
    });
  }

  set hass(hass) {
    this._hass = hass;
  }
  get hass() {
    return this._hass;
  }

  _getLatestFromList(entityIds) {
    const dates = (entityIds || [])
      .map((entityId) => {
        const state = this._hass.states[entityId.entity];
        const lastTime =
          state?.attributes?.last_triggered || state?.last_changed;
        return lastTime ? new Date(lastTime) : null;
      })
      .filter((date) => date !== null)
      .sort((a, b) => b - a);
    return dates[0] || null;
  }

  getCardSize() {
    return 1;
  }

  getGridOptions() {
    return {
      rows: 1,
      columns: 6,
    };
  }

  static getConfigElement() {
    return document.createElement("dialog-list-editor");
  }
}

customElements.define("dialog-list-card", DialogCard);

// Window Event für Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: "dialog-list-card",
  name: "Dialog List Card",
  description: "Ein Dialog mit Aktionen",
  preview: true,
});
