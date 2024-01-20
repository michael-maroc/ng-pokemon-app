import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.css'
})
export class SearchPokemonComponent implements OnInit {
  // Subject permet de stocker toutes les recherches successives de l'utilisateur
  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]|undefined>;

  constructor(
    private router: Router, 
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }

  search(term: string) {
    this.searchTerms.next(term)
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link)
  }
}
