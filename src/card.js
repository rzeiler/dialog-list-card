import "./dialog.js";

class DialogCard extends HTMLElement {
  setConfig(config) {
    this.config = config || { title: "", entities: [] };
    this.render();
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

  console.log("card render");

    this.shadowRoot.innerHTML = `
      <style>
        ha-card{
          display: flex; align-items: center; height: 100%; padding: 5px 10px; cursor: pointer;
        }
      </style>
      <ha-card>
        <div style="position: relative; display: flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; border-radius: 50px; overflow: hidden; transition: box-shadow 180ms ease-in-out; background-color: rgba(158,158,158,.1);">
          <ha-icon icon="${this.config.icon}" style="--mdc-icon-size: 24px;" />
        </div>
        <ha-info style="padding: 5px 10px;">
          <div>${this.config.title}</div>
           <ha-relative-time  style="font-size: 90%;" ></ha-relative-time> 
        </ha-info>
      </ha-card> 
      <dialog-list></dialog-list>
    `;

    const latestExecution = this._getLatestFromList(this.config.entities);

    const relativeTime = this.shadowRoot.querySelector("ha-relative-time");
    relativeTime.hass = this._hass;
    relativeTime.datetime = latestExecution;

    this.dialog = this.shadowRoot.querySelector("dialog-list");
    this.dialog.config = this.config; // Config rein
    if (this._hass) this.dialog.hass = this._hass; // hass nachziehen

    const card = this.shadowRoot.querySelector("ha-card");
    card.addEventListener("click", () => {
      this.dialog.open();
    });
  
    this.shadowRoot.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () =>
        this._callService(btn.dataset.entity)
      );
    });
  }

  _callService(entity) {
    if (!this.hass) return;
    const domain = entity.split(".")[0];
    this.hass.callService(domain, "toggle", { entity_id: entity });
  }

  set hass(hass) {
    this._hass = hass;
    if (this._dialog) {
      this._dialog.hass = hass; // Dialog mit hass versorgen
    }
  }
  get hass() {
    return this._hass;
  }

  _getLatestFromList(entityIds) {
    const dates = entityIds
      .map((entityId) => {
        const state = this._hass.states[entityId.entity];
        const lastTime =
          state?.attributes?.last_triggered || state?.last_changed;
        return lastTime ? new Date(lastTime) : null;
      })
      .filter((date) => date !== null)
      .sort((a, b) => b - a); // Absteigende Sortierung
    return dates[0] || null; // Jüngstes Datum
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
});
