import { createCE, updateCE } from "./utils.js";

class DialogListEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    // ✅ Default Config
    this._config = {
      title: "Services",
      icon: "mdi:menu",
      dialog_title: "Chose Service",
      state_on_entity: "",
      host: "",
      entities: [],
    };
  }

  set hass(hass) {
    this._hass = hass;
  }

  setConfig(config) {
    // ✅ Config mit Defaults mergen
    this._config = {
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
    this.renderted ? this.update() : this.render();
  }

  connectedCallback() {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.renderted ? this.update() : this.render();
  }

  update() {
    if (!this.shadowRoot) return;

    if (!this._hass) return;

    if (!this._config) return;

    this.shadowRoot.getElementById("title").value = this._config.title || "";
    this.shadowRoot.getElementById("dialog_title").value =
      this._config.dialog_title || "";
    this.shadowRoot.getElementById("icon").value = this._config.icon || "";

    let forms = this.shadowRoot.querySelectorAll("ha-form");
    const target = Array.from(forms).find((el) => el.id === "state_on_entity");
    target.schema = [{ name: "entity", selector: { entity: {} } }];
    target.hass = this._hass;
    target.data = { entity: this._config.state_on_entity };
    target.addEventListener("value-changed", (ev) =>
       this._updateConfig("state_on_entity", ev.detail.value.entity)
    );

    const entities = this.shadowRoot.getElementById("entities");

    (this._config.entities || []).map((ent, idx) => {
      let target = Array.from(forms).find((el) => el.id === `entity${idx}`);

      if (target === undefined) {
        target = createCE("ha-form", {
          attrs: {
            id: `entity${idx}`,
            class: "pb-1",
          },
          style: {
            "--mdc-dialog-content-ink-color": "transparent",
          },
        });

        target.addEventListener("value-changed", (ev) =>
          this._updateEntity(idx, ev.detail.value.entity)
        );
        entities.appendChild(target);
      }

      target.schema = [{ name: "entity", selector: { entity: {} } }];
      target.hass = this._hass;
      target.data = { entity: ent.entity };
    });

    forms = this.shadowRoot.querySelectorAll("ha-form");
    this.removeLabel(forms);
  }

  render() {
    if (!this.shadowRoot) return;

    if (!this._hass) return;

    if (!this._config) return;

    this.renderted = true;

    console.log("render");

    this.shadowRoot.innerHTML = `
      <style>
        ha-form-grid {
          display: grid !important;
          grid-template-columns: repeat(var(--form-grid-column-count, auto-fit), minmax(var(--form-grid-min-width, 200px), 1fr));
          grid-column-gap:10px;
          grid-row-gap: 24px;
        }
        ha-button {
          padding-top: 10px;
        }  
        --mdc-dialog-content-ink-color: red; 
      </style>
      <ha-form-expandable>
        <!-- Titel -->
        <ha-expansion-panel expanded outlined icon="menu" header="Titles">
          <ha-form-grid>
            <ha-textfield
              label="Title"
              value="${this._config.title || ""}"
              id="title"
            ></ha-textfield>
            <ha-textfield
              label="Dialog Title"
              value="${this._config.dialog_title || ""}"
              id="dialog_title"
            ></ha-textfield>
            <ha-icon-picker
              label="Symbol"
              hass=${this._hass}
              value="${this._config.icon || ""}"
              id="icon"
            ></ha-icon-picker>
          </ha-form-grid>
          <ha-form
            id="state_on_entity"
          ></ha-form>
        </ha-expansion-panel>
        <ha-expansion-panel id="entities" expanded outlined icon="menu" header="Entitäten (erforderlich)">
            ${(this._config.entities || [])
              .map(
                (ent, idx) =>
                  `<ha-form style="--mdc-dialog-content-ink-color:transparent;" class='pb-1' id="entity${idx}"></ha-form>`
              )
              .join("")}
            <ha-button id="addEntity">+ Entity hinzufügen</ha-button>
        </ha-expansion-panel>
      </ha-form-expandable>
    `;

    const forms = this.shadowRoot.querySelectorAll("ha-form");
    const target = Array.from(forms).find((el) => el.id === "state_on_entity");

    target.schema = [{ name: "entity", selector: { entity: {} } }];
    target.hass = this._hass;
    target.data = { entity: this._config.state_on_entity };

    (this._config.entities || []).map((ent, idx) => {
      const target = Array.from(forms).find((el) => el.id === `entity${idx}`);
      target.schema = [{ name: "entity", selector: { entity: {} } }];
      target.hass = this._hass;
      target.data = { entity: ent.entity };
    });

    this.removeLabel(forms);

    // Event-Listener binden
    this.shadowRoot
      .getElementById("title")
      ?.addEventListener("input", (ev) =>
        this._updateConfig("title", ev.target.value)
      );

    this.shadowRoot
      .getElementById("dialog_title")
      ?.addEventListener("input", (ev) =>
        this._updateConfig("dialog_title", ev.target.value)
      );

    this.shadowRoot
      .getElementById("icon")
      ?.addEventListener("value-changed", (ev) =>
        this._updateConfig("icon", ev.detail.value)
      );

    this.shadowRoot
      .getElementById("state_on_entity")
      ?.addEventListener("value-changed", (ev) =>
        this._updateConfig("state_on_entity", ev.detail.value.entity)
      );

    // Entities bearbeiten
    this._config.entities.forEach((ent, idx) => {
      const form = this.shadowRoot.getElementById(`entity_${idx}`);
      form?.addEventListener("value-changed", (ev) =>
        this._updateEntity(idx, ev.detail.value.entity)
      );
    });

    this.shadowRoot
      .getElementById("addEntity")
      ?.addEventListener("click", () => this._addEntity());
  }

  removeLabel(forms) {
    (async () => {
      const selectors = [
        "ha-selector",
        "ha-selector-entity",
        "ha-entity-picker",
        "ha-generic-picker",
        "label",
      ];
      for (const form of forms) {
        let element = form;
        for (const sel of selectors) {
          element = await this.waitForElement(element, sel, 100);

          if (sel == "label" && element && element.parentNode) {
            element.parentNode.removeChild(element);
          }

          if (!element) break; // falls ein Element nicht gefunden wird
        }
      }
    })();
  }

  waitForElement(parent, selector, timeout = 50) {
    return new Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        const el = parent?.shadowRoot?.querySelector(selector);
        if (el || Date.now() - start > timeout) {
          resolve(el || null);
        } else {
          requestAnimationFrame(check); // prüft so schnell wie möglich
        }
      };
      check();
    });
  }

  _updateConfig(key, value) {
    this._config = { ...this._config, [key]: value };
    this.fireChange();
  }

  _updateEntity(idx, value) {
    const newEntities = [...this._config.entities];
    newEntities[idx] = value;
    this._config = { ...this._config, entities: newEntities };
    this.fireChange();
  }

  _addEntity() {
    this._config = {
      ...this._config,
      entities: [...this._config.entities, ""],
    };
    this.fireChange();
  }

  fireChange() {
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define("dialog-list-editor", DialogListEditor);
