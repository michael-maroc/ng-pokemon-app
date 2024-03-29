import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonTypeColorPipe } from '../pokemon-type-color.pipe';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule ,FormsModule, PokemonTypeColorPipe, LoaderComponent],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  // récupération de tous les types de pokémons
  ngOnInit(): void {
    // pokemonTypes
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
  }

  // vérification de l'existence du type du pokémon sélectionné
  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  // Si le type existe, on coche la checkebox sinon on la décoche
  selectType($event: Event, type: string) {
    const isChecked = ($event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.pokemon.types.push(type)
    } else {
      const index = this.pokemon.types.indexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }

  // Si le pokémon n'a qu'un seul type et qu'on travaille dessus, on bloque la checkbox
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length == 1 && this.hasType(type)) {
      return false;
    }
    /*  Si l'utilisateur a déjà sélectionné 3 cases alors il faut l'empêcher de pouvoir sélectionner les autres cases
     sinon il va pouvoir ajouter un 4è type mais il doit pouvoir déselectionner un des 3 types déjà sélectionnés  */
    if (this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false;
    }

    return true;
  }

  // redirection vers la page du pokémon édité en cas de soumission du formulaire
  onSubmit() {
    if(this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
    } else {
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
    }
  }
}
