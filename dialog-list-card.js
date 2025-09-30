/*! For license information please see dialog-list-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:h,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,g=globalThis,$=g.trustedTypes,_=$?$.emptyScript:"",f=g.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?_:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!h(t,e),A={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=A){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??A}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const o=n.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[m("elementProperties")]=new Map,b[m("finalized")]=new Map,f?.({ReactiveElement:b}),(g.reactiveElementVersions??=[]).push("2.1.1");const E=globalThis,w=E.trustedTypes,S=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+C,P=`<${O}>`,U=document,T=()=>U.createComment(""),k=t=>null===t||"object"!=typeof t&&"function"!=typeof t,H=Array.isArray,L=t=>H(t)||"function"==typeof t?.[Symbol.iterator],M="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,D=/>/g,j=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,I=/"/g,B=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),V=W(1),q=(W(2),W(3),Symbol.for("lit-noChange")),F=Symbol.for("lit-nothing"),K=new WeakMap,Z=U.createTreeWalker(U,129);function J(t,e){if(!H(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<i;e++){const i=t[e];let a,h,l=-1,c=0;for(;c<i.length&&(r.lastIndex=c,h=r.exec(i),null!==h);)c=r.lastIndex,r===N?"!--"===h[1]?r=R:void 0!==h[1]?r=D:void 0!==h[2]?(B.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=j):void 0!==h[3]&&(r=j):r===j?">"===h[0]?(r=n??N,l=-1):void 0===h[1]?l=-2:(l=r.lastIndex-h[2].length,a=h[1],r=void 0===h[3]?j:'"'===h[3]?I:z):r===I||r===z?r=j:r===R||r===D?r=N:(r=j,n=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";o+=r===N?i+P:l>=0?(s.push(a),i.slice(0,l)+x+i.slice(l)+C+d):i+C+(-2===l?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Q{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[h,l]=G(t,e);if(this.el=Q.createElement(h,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(x)){const e=l[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?it:"?"===r[1]?st:"@"===r[1]?nt:et}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=w?w.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],T()),Z.nextNode(),a.push({type:2,index:++n});s.append(t[e],T())}}}else if(8===s.nodeType)if(s.data===O)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function X(t,e,i=t,s){if(e===q)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=k(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=X(t,n._$AS(t,e.values),n,s)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??U).importNode(e,!0);Z.currentNode=s;let n=Z.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new ot(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=Z.nextNode(),o++)}return Z.currentNode=U,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),k(t)?t===F||null==t||""===t?(this._$AH!==F&&this._$AR(),this._$AH=F):t!==this._$AH&&t!==q&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):L(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==F&&k(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Q.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new Y(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new Q(t)),e}k(t){H(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new tt(this.O(T()),this.O(T()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=X(this,t,e,0),o=!k(t)||t!==this._$AH&&t!==q,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=X(this,s[i+r],e,r),a===q&&(a=this._$AH[r]),o||=!k(a)||a!==this._$AH[r],a===F?t=F:t!==F&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===F?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==F)}}class nt extends et{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??F)===q)return;const i=this._$AH,s=t===F&&i!==F||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==F&&(i===F||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const rt=E.litHtmlPolyfillSupport;rt?.(Q,tt),(E.litHtmlVersions??=[]).push("3.3.1");const at=globalThis;class ht extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new tt(e.insertBefore(T(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ht._$litElement$=!0,ht.finalized=!0,at.litElementHydrateSupport?.({LitElement:ht});const lt=at.litElementPolyfillSupport;lt?.({LitElement:ht});(at.litElementVersions??=[]).push("4.2.1");class ct extends ht{static properties={hass:{type:Object},config:{type:Object},_isOpen:{state:!0}};static styles=o`
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
  `;constructor(){super(),this.hass=null,this.config=null,this._isOpen=!1}render(){if(!this._isOpen)return V``;const t=this._isWide()?"wide":"narrow",e=this.config.dialog_title||this.config.title||"Dialog List";return V`
      <ha-dialog
        class=${t}
        .open=${this._isOpen}
        .hideActions=${!0}
        .scrimClickAction=${!0}
        .escapeKeyAction=${!0}
        @closed=${this._handleClosed}
        heading=""
      >
        <ha-dialog-header>
          <span slot="title">${e}</span>
          <ha-icon-button
            slot="navigationIcon"
            dialogAction="cancel"
            .label=${this.hass.localize("ui.common.close")}
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
          ></ha-icon-button>
        </ha-dialog-header>

        <ha-list>
          ${this.config.entities.map(t=>this._renderListItem(t))}
        </ha-list>
      </ha-dialog>
    `}_renderListItem(t){const e="string"==typeof t?t:t.entity,i=this.hass.states[e];if(!i)return V``;const s=e.split(".")[0],n=t.title||i.attributes.friendly_name||e;return V`
      <ha-md-list-item
        .interactive=${!0}
        .multiline=${!0}
        type="button"
        @click=${()=>this._serviceCall(s,e)}
      >
        <ha-state-icon
          slot="start"
          .hass=${this.hass}
          .stateObj=${i}
        ></ha-state-icon>

        <span slot="headline">${n}</span>

        <ha-relative-time
          slot="supporting-text"
          .hass=${this.hass}
          .datetime=${i?.attributes.last_triggered}
        ></ha-relative-time>
      </ha-md-list-item>
    `}_isWide(){return window.matchMedia("(min-width: 590px) and (min-height: 500px)").matches}_serviceCall(t,e){let i="toggle";("script"===t||"scene"===t)&&(i="turn_on"),this.hass.callService(t,i,{entity_id:e}).then(()=>{this._isOpen=!1})}_handleClosed(){this._isOpen=!1}open(){this._isOpen=!0}}customElements.define("dialog-list",ct);class dt extends ht{static properties={hass:{type:Object},config:{type:Object}};constructor(){super(),this.hass=null,this.config={title:"Services",icon:"mdi:unicorn",dialog_title:"Choose Service",state_on_entity:"",host:"",entities:[]}}static styles=o`
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
  `;setConfig(t){this.config={...this.config,...t}}render(){if(!this.hass)return V``;const t=this.config.entities?.length>0?this._getLatestFromList(this.config.entities):Date.now();return V`
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
            .datetime=${t}
          ></ha-relative-time>
        </ha-info>
      </ha-card>
    `}_getLatestFromList(t){const e=(t||[]).map(t=>{const e=this.hass?.states[t.entity],i=e?.attributes?.last_triggered||e?.last_changed;return i?new Date(i):null}).filter(t=>null!==t).sort((t,e)=>e-t);return e[0]||null}_openDialog(){const t=document.createElement("dialog-list");t.config=this.config,t.hass=this.hass,document.body.appendChild(t),t.open()}getCardSize(){return 1}getGridOptions(){return{rows:1,columns:6}}static getConfigElement(){return document.createElement("dialog-list-editor")}}customElements.define("dialog-list-card",dt),window.customCards=window.customCards||[],window.customCards.push({type:"dialog-list-card",name:"Dialog List Card",description:"Ein Dialog mit Aktionen",preview:!0});class pt extends ht{static properties={hass:{type:Object},config:{type:Object}};constructor(){super(),this.hass=null,this.config={title:"Services",icon:"mdi:menu",dialog_title:"Choose Service",state_on_entity:"",host:"",entities:[]}}static styles=o`
    ha-form-grid {
      display: grid !important;
      grid-template-columns: repeat(
        var(--form-grid-column-count, auto-fit),
        minmax(var(--form-grid-min-width, 200px), 1fr)
      );
      grid-column-gap: 10px;
      grid-row-gap: 24px;
    }
    .wide {
      grid-column: 1 / -1; /* von erster bis letzter Spalte */
    }
    .pt-2 {
      padding-top: 0.5em;
    }
  `;setConfig(t){this.config={title:"Services",icon:"mdi:menu",dialog_title:"Choose Service",state_on_entity:"",host:"",entities:[],...t}}render(){return this.hass&&this.config?V`
      <ha-form
        style="display:none"
        .hass=${this.hass}
        .data=${{}}
        .schema=${[{name:"",selector:{entity:{}}}]}
      ></ha-form>
      <ha-form-expandable>
        <!-- Titel -->
        <ha-expansion-panel expanded outlined icon="menu" header="Titles">
          <ha-form-grid>
            <ha-textfield
              label="Title"
              .value=${this.config.title}
              @input=${t=>this._updateConfig("title",t.target.value)}
            ></ha-textfield>
            <ha-textfield
              label="Dialog Title"
              .value=${this.config.dialog_title}
              @input=${t=>this._updateConfig("dialog_title",t.target.value)}
            ></ha-textfield>
            <ha-icon-picker
              label="Symbol"
              .hass=${this.hass}
              .value=${this.config.icon}
              @value-changed=${t=>this._updateConfig("icon",t.detail.value)}
            ></ha-icon-picker>
            <ha-entity-picker
              class="wide"
              label="State On Entity"
              .hass=${this.hass}
              .value=${this.config.state_on_entity}
              @value-changed=${t=>this._updateConfig("state_on_entity",t.detail.value)}
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
          <ha-form-grid>
            ${this.config.entities.map((t,e)=>V`
                <ha-entity-picker
                  class="wide"
                  label=""
                  .hass=${this.hass}
                  .value=${t.entity}
                  .index=${e}
                  @value-changed=${t=>this._updateEntity(e,{entity:t.detail.value})}
                ></ha-entity-picker>
              `)}
            <ha-entity-picker
              class="wide"
              label="Entity hinzufügen"
              .hass=${this.hass}
              @value-changed=${t=>{this._addEntity({entity:t.detail.value}),t.target.value=""}}
            ></ha-entity-picker>
          </ha-form-grid>
        </ha-expansion-panel>
      </ha-form-expandable>
    `:V``}_updateConfig(t,e){this.config={...this.config,[t]:e},this._fireChange()}_updateEntity(t,e){const i=[...this.config.entities];i[t]=e,this.config={...this.config,entities:i},this._fireChange()}_addEntity(t){this.config={...this.config,entities:[...this.config.entities,t]},this._fireChange()}_fireChange(){this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this.config},bubbles:!0,composed:!0}))}}customElements.define("dialog-list-editor",pt)})();