class DialogList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = null;
    this._config = null;
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  set config(config) {
    this._config = config;
    this._update();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        @media (min-width: 600px) and (min-height: 501px) {
            ha-dialog {
                --mdc-dialog-min-width: 580px;
                --mdc-dialog-max-width: 580px;
                --mdc-dialog-max-height: calc(100% - 72px);
            }
        }
        ha-dialog {
            --vertical-align-dialog: flex-start;
            --dialog-surface-margin-top: 40px;
            --dialog-content-padding: 0;
        }
      </style>
      <ha-dialog>
        <ha-list>
          
        </ha-list>
      <ha-dialog>
    `;

    this.dialog = this.shadowRoot.querySelector("ha-dialog");

    this.dialog.open = false;
    this.dialog.hideActions = true;
    this.dialog.scrimClickAction = true;
    this.dialog.escapeKeyAction;
  }

  _update() {
    if (!this.shadowRoot) return;

    const haList = this.dialog.querySelector("ha-list");

    if (this._config) {
      this.dialog.heading = this._config.title;
    }

    if (this._hass && this._config?.entities) {
      haList.innerHTML = "";
      this._config.entities.map((ent) => {
        const st = this._hass.states[ent];
        const listIitem = this.getListItem(ent);

        // Aktion aufrufen
        const call = () => this.serviceCall(listIitem.domain, ent);
        listIitem.addEventListener("click", call);
        listIitem.addEventListener("touchend", call);

        haList.appendChild(listIitem);
      });
    }
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
    this._update();
    this.dialog.open = !this.dialog.open;
  }

  getListItem(item) {
    const ent = typeof item === "string" ? item : item.entity;
    const st = this._hass.states[ent];
    if (!st) return;

    const listItem = document.createElement("ha-md-list-item");
    listItem.classList.add("two-line");
    listItem.type = "button";
    listItem.interactive = true;
    listItem.multiline = true;

    const headline = document.createElement("span");
    headline.innerText = item.title || st.attributes.friendly_name || ent;
    headline.slot = "headline";
    listItem.appendChild(headline);

    const relativeTime = document.createElement("ha-relative-time");
    relativeTime.hass = this._hass;
    relativeTime.slot = "supporting-text";
    relativeTime.datetime = st?.attributes.last_triggered;
    listItem.appendChild(relativeTime);

    const domain = ent.split(".")[0];
    listItem.domain = domain;

    const text = document.createElement("span");
    text.innerText = domain;
    text.slot = "trailing-supporting-text";
    listItem.appendChild(text);

    // ha-state-icon Element erstellen
    const stateIcon = document.createElement("ha-state-icon");
    stateIcon.slot = "start";
    stateIcon.hass = this._hass;
    stateIcon.stateObj = st;
    // Optionale Parameter
    stateIcon.style.setProperty("--mdc-icon-size", "22px"); // Icon Größe
    stateIcon.style.color = st.state === "on" ? "orange" : "gray";

    // Zum Container hinzufügen
    listItem.appendChild(stateIcon);

    return listItem;
  }
}

customElements.define("dialog-list", DialogList);
