import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { BorderCardDirective } from '../border-card.directive';
import { Router, RouterLink } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-list-pokemon',
  standalone: true,
  imports: [CommonModule ,PokemonTypeColorPipe, BorderCardDirective, RouterLink, SearchPokemonComponent, LoaderComponent],
  templateUrl: './list-pokemon.component.html'
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList()
      .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
