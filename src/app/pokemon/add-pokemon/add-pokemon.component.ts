import { Component, OnInit } from '@angular/core';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  standalone: true,
  imports: [PokemonFormComponent],
  template: `
    <h2 class="center">Ajouter un pokémon</h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `,
  styleUrl: './add-pokemon.component.css'
})
export class AddPokemonComponent implements OnInit {
  pokemon: Pokemon;

  ngOnInit(): void {
    this.pokemon = new Pokemon();
  }
}
