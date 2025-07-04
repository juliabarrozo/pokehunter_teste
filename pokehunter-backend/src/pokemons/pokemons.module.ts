import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonService } from './shared/pokemon.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entity/pokemon.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,  // Importa o módulo que fornece HttpService
        TypeOrmModule.forFeature([Pokemon]),  // Importa o repositório Cidade
      ],
    controllers: [PokemonsController],
    providers: [PokemonService],
    exports: [PokemonService],
})
export class PokemonsModule {}
