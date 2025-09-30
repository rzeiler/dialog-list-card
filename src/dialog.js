import { LitElement, html, css } from "lit";
import { mdiClose } from "@mdi/js";

class DialogList extends LitElement {
  static properties = {
    hass: { type: Object },
    config: { type: Object },
    _isOpen: { state: true },
  };

  static styles = css`
    :host {
      display: block;
    }

    ha-dialog {
      --vertical-align-dialog: flex-start;
      --dialog-surface-margin-top: 40px;
      --dialog-content-padding: 0px;
      --mdc-dialog-max-height: calc(100% - 72px);
    }

    ha-dialog.wide {
      --mdc-dialog-min-width: 570px;
      --mdc-dialog-max-width: 570px;
    }

    ha-dialog.narrow {
      --mdc-dialog-min-width: 90vw;
      --mdc-dialog-max-width: 90vw;
    }

    ha-state-icon {
      --mdc-icon-size: 28px;
    }
  `;

  constructor() {
    super();
    this.hass = null;
    this.config = null;
    this._isOpen = false;
  }

  render() {
    if (!this._isOpen) return html``;

    const dialogClass = this._isWide() ? "wide" : "narrow";
    const dialogTitle =
      this.config.dialog_title || this.config.title || "Dialog List";

    return html`
      <ha-dialog
        class=${dialogClass}
        .open=${this._isOpen}
        .hideActions=${true}
        .scrimClickAction=${true}
        .escapeKeyAction=${true}
        @closed=${this._handleClosed}
        heading=""
      >
        <ha-dialog-header>
          <span slot="title">${dialogTitle}</span>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize("ui.common.close")}
            .path=${mdiClose}
          ></ha-icon-button>
        </ha-dialog-header>

        <ha-list>
          ${this.config.entities.map((ent) => this._renderListItem(ent))}
        </ha-list>
      </ha-dialog>
    `;
  }

  _renderListItem(item) {
    const ent = typeof item === "string" ? item : item.entity;
    const st = this.hass.states[ent];
    if (!st) return html``;

    const domain = ent.split(".")[0];
    const title = item.title || st.attributes.friendly_name || ent;

    return html`
      <ha-md-list-item
        .interactive=${true}
        .multiline=${true}
        type="button"
        @click=${() => this._serviceCall(domain, ent)}
      >
        <ha-state-icon
          slot="start"
          .hass=${this.hass}
          .stateObj=${st}
        ></ha-state-icon>

        <span slot="headline">${title}</span>

        <ha-relative-time
          slot="supporting-text"
          .hass=${this.hass}
          .datetime=${st?.attributes.last_triggered}
        ></ha-relative-time>
      </ha-md-list-item>
    `;
  }

  _isWide() {
    return window.matchMedia("(min-width: 590px) and (min-height: 500px)")
      .matches;
  }

  _serviceCall(domain, ent) {
    let action = "toggle";

    if (domain === "script") {
      action = "turn_on";
    } else if (domain === "scene") {
      action = "turn_on";
    }

    this.hass
      .callService(domain, action, {
        entity_id: ent,
      })
      .then(() => {
        this._isOpen = false;
      });
  }

  _handleClosed() {
    this._isOpen = false;
  }

  open() {
    this._isOpen = true;
  }
}

customElements.define("dialog-list", DialogList);