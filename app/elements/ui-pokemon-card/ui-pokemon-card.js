import { LitElement, html } from 'lit-element';

import css from './ui-pokemon-card-styles';
import { capitalizer } from '../utils';
import { DmPokemonInfo } from '../dm-pokemon-info/dm-pokemon-info';
export class UiPokemonCard extends LitElement {
  static get is() {
    return 'ui-pokemon-card';
  }

  static styles = [ css ];

  static get properties() {
    return {
      id: { type: Number, },
      name: { type: String, },      
      image: { type: String, attribute: false },
    };
  }

  constructor() {
    super();
    this.id = 1;
    this.name = '';
    this.image = '';
  }

  async firstUpdated() {
    const { name, image } = await this.loadPokemonData();
    this.name = name;
    this.image = image;
  }

  render() {
    if (this.image)
      return html `
        <figure class="pokemon-img">
          <image src="${ this.image }" alt="${ this.name }" />
          <figcaption class="pokemon-name">
            ${ capitalizer(this.name) }          
          </figcaption>
        </figure>
      `;
  }

  async loadPokemonData() {
    const pokemonInfo = new DmPokemonInfo();
    pokemonInfo.id = this.id;
    return await pokemonInfo.getPokemonInfo();
  }  
}
customElements.define(UiPokemonCard.is, UiPokemonCard);