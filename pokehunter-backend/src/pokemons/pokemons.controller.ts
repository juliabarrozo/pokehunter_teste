import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { PokemonService } from './shared/pokemon.service';
import { Pokemon } from './entity/pokemon.entity';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  getAll() {
    return this.pokemonService.getAll();
  }

  @Get()
  getById(@Param('id') id: number) {
    return this.pokemonService.getById(id);
  }

  @Put()
  update(@Param('id') id: number, @Body() pokemon: Pokemon): Promise<Pokemon> {
    pokemon.id = id;
    return this.pokemonService.update(id, pokemon);
  }

  @Delete()
  delete(@Param('id') id: number) {
    return this.pokemonService.delete(id);
  }
}
