import { html } from 'lit-element';
import { CellsPage } from '@cells/cells-page';

import css from './evolutions-page-styles';

import '../ui-pokemon-detail/ui-pokemon-detail';

export class EvolutionsPage extends CellsPage {
  static get is() {
    return 'evolutions-page';
  }

  static styles = [ css ];

  static get properties() {
    return {
      evl1: { type: String },
      evl2: { type: String },
      ids: { type: Array, attribute: false },
    };
  }

  constructor() {
    super();
    this.evl1 = "";
    this.evl2 = "";
    this.ids = [];
  }

  onPageEnter() {    
    this.ids = this._getEvolutionsIds({
      evl1: this.evl1,
      evl2: this.evl2,
    });
  }

  onPageLeave() {
    this._refreshVars();
  }

  _refreshVars() {
    this.ids = [];
    this.evl1 = "";
    this.evl2 = "";
  }

  render() {
    return html `
      <div class="pokemon-container">
        ${ this.ids.length !== 0 && this.ids.length !== 0 ? this.ids.map(id => html `
          <ui-pokemon-detail
            class="pokemon ${ this.ids.length === 1 ? "one-pokemon" : "" }"              
            id="${ id }"
          ></ui-pokemon-detail>                        
        `) : ""}
      </div>
    `;
  }

  _getEvolutionsIds(params = {}) {
    const { nextEvolutions } = localStorage.getItem('evolutions') ? JSON.parse(localStorage.getItem('evolutions')) : {};    
    const lsIds = nextEvolutions.map(({id}) => id);
    const result = Object.entries(params).map(item => parseInt(item[1]));
    
    return this._idsValidator(lsIds, result) ? result.filter(item => !isNaN(item)) : lsIds;
  }

  _idsValidator(lsIds = [], result = []) {    
    let idsMatch = true;

    for (const id in result) {
      if (lsIds[id] !== result[id]) {
        idsMatch = false;
      };
    };
    return idsMatch;
  }
}
customElements.define(EvolutionsPage.is, EvolutionsPage);