import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';
import '@bbva-web-components/bbva-core-spinner/bbva-core-spinner';
import '@bbva-web-components/bbva-web-navigation-pagination/bbva-web-navigation-pagination';

import '../ui-pokemon-card/ui-pokemon-card';

import css from './home-page-styles';

export class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }

  static styles = [ css ];

  static get properties() {
    return {
      pokemons: { type: Array },      
      count: { type: Number },
      next: { type: String },
      previous: { type: String },
      currentPage: { type: Number, attribute: false },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
    this.count = 0;
    this.next = null;
    this.previous = null;
    this.pages = 0;
    this.currentPage = 1;
  }

  onPageEnter() {
    localStorage.removeItem('evolutions');
    this._loadData();
  }

  _loadData() {
    this.dispatchEvent(new CustomEvent('load-data', { bubbles: true, composed: true }));
  }

  render() {
    return html `
      ${ this.pokemons?.length === 0 ? html `
        <bbva-core-spinner with-mask=""></bbva-core-spinner>
      ` : this.pokemons?.map(({id, name, nextEvolutions}) => html `
        <ui-pokemon-card
          id="${ id }"
          name="${ name }"
          @click="${ () => this._handleNavigation({ id , nextEvolutions}) }"
        ></ui-pokemon-card>
      `) }
      <bbva-web-navigation-pagination
        current-page="${ this.currentPage }"
        pages="28"
        results="${ this.results }"
        visible-pages="10"
        visible-result="${ this.pokemons?.length }"
        @back-click="${ this._handlePrevPage }"      
        @next-click="${ this._handleNextPage }"      
        @number-click="${ this._handleIndexPage }"
        @first-click="${ this._handleFirstPage }"
        @end-click="${ this._handleLastPage }"
      >
      </bbva-web-navigation-pagination>
    `;
  }

  async _handleNextPage() {
    this.pokemons = [];
    if (!this.next) return;
    this._firePages('next'); 
  }

  async _handlePrevPage() {
    this.pokemons = [];
    if (!this.previous) return;
    this._firePages('previous');
  }

  async _handleIndexPage(index = 0) {
    this.pokemons = [];
    this._firePages('index', index);
  }

  async _handleFirstPage() {
    this.pokemons = [];
    this._firePages('first');
  }
  
  async _handleLastPage() {
    this.pokemons = [];
    this._firePages('last');
  }

  _handleNavigation({id, nextEvolutions}) {
    localStorage.setItem('evolutions', JSON.stringify({id, nextEvolutions}));
    this.dispatchEvent(new CustomEvent('navigate-detail', { detail: {
      id: id
    }}));    
  }

  _firePages(page = "", payload = {}) {
    this.dispatchEvent(new CustomEvent(`handle-${ page }-page`, {
      bubbles: true, composed: true, detail: payload
    }));
  }

}
customElements.define(HomePage.is, HomePage);