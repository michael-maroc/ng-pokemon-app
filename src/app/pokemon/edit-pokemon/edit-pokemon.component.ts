import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';

@Component({
  selector: 'app-edit-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonFormComponent],
  template: `
    <h2 class="center">Editer {{ pokemon?.name }} </h2>
    <p class="center">
      <img *ngIf="pokemon" [src]="pokemon.picture" />
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styleUrl: './edit-pokemon.component.css'
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon|undefined;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
    } else {
      this.pokemon = undefined
    }
  }
}
