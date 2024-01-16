import { Component } from '@angular/core';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { BorderCardDirective } from '../border-card.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [CommonModule ,PokemonTypeColorPipe, BorderCardDirective],
  templateUrl: './list-pokemon.component.html'
})
export class ListPokemonComponent {
  pokemonList: Pokemon[] = POKEMONS;
  pokemonSelected: Pokemon | undefined;

  constructor(private router: Router) {
    
  }

  gotToPokemon(pokemon: Pokemon) {
    this.router.navigateByUrl(`/pokemon/${pokemon.id}`)
  }


  // selectPokemon(pokemonId: string) {
  //   const pokemon: Pokemon | undefined = this.pokemonList.find((pokemon) => pokemon.id == +pokemonId)
  //   if (pokemon) {
  //     console.log(`Vous avez cliqué sur le pokémon ${pokemon.name}`);
  //     this.pokemonSelected = pokemon;
  //   } else {
  //     console.log("Le pokémon que vous avez demandé n'existe pas");
  //     this.pokemonSelected = pokemon;
  //   }
  // }
}
