import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { CommonModule } from '@angular/common';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  standalone: true,
  imports: [CommonModule, PokemonTypeColorPipe],
  templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
    }
  }

  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
      .subscribe(() => this.goToPokemonList());
  }

  goToPokemonList() {
    this.router.navigateByUrl('/pokemons');
  }

  goToEditPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
