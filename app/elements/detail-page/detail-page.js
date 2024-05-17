import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import '@bbva-web-components/bbva-button-default';

import css from './detail-page-styles';

import '../ui-pokemon-detail/ui-pokemon-detail';

export class DetailPage extends CellsPage {
  static get is() {
    return 'detail-page';
  }

  static styles = [ css ];

  static get properties() {
    return {
      id: { type: Number },
    };
  }

  constructor() {
    super();
    this.showComponent = false;
  }

  onPageEnter() {    
    this.showComponent = true;
    this.requestUpdate();
  }

  onPageLeave() {    
    this.showComponent = false;
    this.requestUpdate();
  }

  updated() {
    this._validatePokemonData();
  }
  
  render() {
    return html `
    ${ this.id && this.showComponent ? html `
      <ui-pokemon-detail
        class="pokemon"
        id="${ this.id }"
      >
        <bbva-button-default
          text="Evolutions"
          @click="${ this._handleNavigation }"
        ></bbva-button-default>
      </ui-pokemon-detail>
      ` : "" }
    `;
  }

  async _handleNavigation() {
    const idEvolutions = {};
    const evolutions = [ ...await this._getPokemonEvolutions() ];

    for (const id in evolutions) {
      idEvolutions[`evl${ parseInt(id) + 1 }`] = evolutions[id]?.id;
    }

    this.dispatchEvent(new CustomEvent('navigate-evolutions', { 
      bubbles: true,
      composed: true,
      detail: idEvolutions,
    }));    
  }

  async _getPokemonEvolutions() {
    const { nextEvolutions } = this._validatePokemonData();    
    return nextEvolutions;
  }

  _validatePokemonData() {    
    const evolutions = localStorage.getItem('evolutions') ? JSON.parse(localStorage.getItem('evolutions')) : {};
    if (!evolutions?.nextEvolutions) {
      this._disableButton();
    };
    return evolutions;
  }

  _disableButton() {
    const button = this.shadowRoot.querySelector('bbva-button-default');
    button?.setAttribute('disabled', true);
  }
}
customElements.define(DetailPage.is, DetailPage);