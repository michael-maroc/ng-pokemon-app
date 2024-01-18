import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from './pokemon/pokemon';
import { POKEMONS } from './pokemon/mock-pokemon-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  pokemonList: Pokemon[] = POKEMONS;

  ngOnInit(): void {
    // console.table(this.pokemonList)
  }

}
