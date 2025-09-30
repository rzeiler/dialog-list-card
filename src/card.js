import { LitElement, html, css } from "lit";
import "./dialog.js";

class DialogListCard extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };

  constructor() {
    super();
    this.hass = null;
    this.config = {
      title: "Services",
      icon: "mdi:unicorn",
      dialog_title: "Choose Service",
      state_on_entity: "",
      host: "",
      entities: [],
    };
  }

  static styles = css`
    ha-card {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 5px 10px;
      cursor: pointer;
    }
    .background {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 36px;
      height: 36px;
      border-radius: 50px;
      overflow: hidden;
      transition: box-shadow 180ms ease-in-out;
      background-color: rgba(158, 158, 158, 0.1);
    }
    ha-info {
      padding: 5px 10px;
      overflow: hidden;
    }
    .title {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    ha-relative-time {
      font-size: 90%;
    }
  `;

  setConfig(config) {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  render() {
    if (!this.hass) return html``;

    const latestExecution =
      this.config.entities?.length > 0
        ? this._getLatestFromList(this.config.entities)
        : Date.now();

    return html`
      <ha-card @click=${this._openDialog}>
        <div class="background">
          <ha-state-icon
            .icon=${this.config.icon}
            style="--mdc-icon-size: 28px"
          ></ha-state-icon>
        </div>
        <ha-info>
          <div class="title">${this.config.title}</div>
          <ha-relative-time
            .hass=${this.hass}
            .datetime=${latestExecution}
          ></ha-relative-time>
        </ha-info>
      </ha-card>
    `;
  }

  _getLatestFromList(entityIds) {
    const dates = (entityIds || [])
      .map((entityId) => {
        const state = this.hass?.states[entityId.entity];
        const lastTime =
          state?.attributes?.last_triggered || state?.last_changed;
        return lastTime ? new Date(lastTime) : null;
      })
      .filter((date) => date !== null)
      .sort((a, b) => b - a);
    return dates[0] || null;
  }

  _openDialog() {
    const dialog = document.createElement("dialog-list");
    dialog.config = this.config;
    dialog.hass = this.hass;
    document.body.appendChild(dialog);
    dialog.open();
  }

  getCardSize() {
    return 1;
  }

  getGridOptions() {
    return { rows: 1, columns: 6 };
  }

  static getConfigElement() {
    return document.createElement("dialog-list-editor");
  }
}

customElements.define("dialog-list-card", DialogListCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "dialog-list-card",
  name: "Dialog List Card",
  description: "Ein Dialog mit Aktionen",
  preview: true,
});
