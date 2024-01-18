import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from './pokemon/mock-pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    /* La constante doit être réassignée dans la méthode this.createDb() 
       car on ne peut pas passer une constante qui vient d'un autre fichier */
    const pokemons = POKEMONS; 
    return { pokemons };
  }
}
