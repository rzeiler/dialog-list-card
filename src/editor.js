import { LitElement, html, css } from "lit";

class DialogListEditor extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
  };

  constructor() {
    super();
    this.hass = null;
    this.config = {
      title: "Services",
      icon: "mdi:menu",
      dialog_title: "Choose Service",
      state_on_entity: "",
      host: "",
      entities: [],
    };
  }

  static styles = css`
    ha-form-grid {
      display: grid !important;
      grid-template-columns: repeat(
        var(--form-grid-column-count, auto-fit),
        minmax(var(--form-grid-min-width, 200px), 1fr)
      );
      grid-column-gap: 10px;
      grid-row-gap: 24px;
    }
  `;

  setConfig(config) {
    this.config = {
      title: "Services",
      icon: "mdi:menu",
      dialog_title: "Choose Service",
      state_on_entity: "",
      host: "",
      entities: [],
      ...config,
    };
  }

  render() {
    if (!this.hass || !this.config) return html``;

    return html`
        
      
      <ha-form-expandable>
        <!-- Titel -->
        <ha-expansion-panel expanded outlined icon="menu" header="Titles">
          <ha-form-grid>
            <ha-textfield
              label="Title"
              .value=${this.config.title}
              @input=${(e) => this._updateConfig("title", e.target.value)}
            ></ha-textfield>
            <ha-textfield
              label="Dialog Title"
              .value=${this.config.dialog_title}
              @input=${(e) =>
                this._updateConfig("dialog_title", e.target.value)}
            ></ha-textfield>
            <ha-icon-picker
              label="Symbol"
              .hass=${this.hass}
              .value=${this.config.icon}
              @value-changed=${(e) =>
                this._updateConfig("icon", e.detail.value)}
            ></ha-icon-picker>
            <div></div>
            <ha-entity-picker
              label="State On Entity"
              .hass=${this.hass}
              .value=${this.config.state_on_entity}
              @value-changed=${(e) =>
                this._updateConfig("state_on_entity", e.detail.value)}
            ></ha-entity-picker>
          </ha-form-grid>
        </ha-expansion-panel>

        <!-- Entities -->
        <ha-expansion-panel
          expanded
          outlined
          icon="menu"
          header="Entitäten (erforderlich)"
        >
          <div id="entities">
            ${this.config.entities.map(
              (ent, idx) => html`
                <ha-entity-picker
                  label=""
                  .hass=${this.hass}
                  .value=${ent.entity}
                  .index=${idx}
                  @value-changed=${(e) =>
                    this._updateEntity(idx, { entity: e.detail.value })}
                ></ha-entity-picker>
              `
            )}
          </div>

          <ha-button style="margin-top: 20px;" @click=${this._addEntity}>
            + Entity hinzufügen
          </ha-button>
        </ha-expansion-panel>
      </ha-form-expandable> 
    `;
  }

  _updateConfig(key, value) {
    this.config = { ...this.config, [key]: value };
    this._fireChange();
  }

  _updateEntity(idx, value) {
    console.log(idx, value);
    const newEntities = [...this.config.entities];
    newEntities[idx] = value;
    this.config = { ...this.config, entities: newEntities };
    this._fireChange();
  }

  _addEntity() {
    this.config = {
      ...this.config,
      entities: [...this.config.entities, ""],
    };
    this._fireChange();
  }

  _fireChange() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("dialog-list-editor", DialogListEditor);
