import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CidadesController } from './cidades.controller';
import { CidadeService } from './shared/cidade.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cidade } from './entity/cidade.entity';
import { PokemonsModule } from 'src/pokemons/pokemons.module';

@Module({
    imports: [
    HttpModule,  // Importa o módulo que fornece HttpService
    TypeOrmModule.forFeature([Cidade]),
    PokemonsModule  // Importa o repositório Cidade
  ],
    controllers: [CidadesController],
    providers: [CidadeService],


})
export class CidadesModule {}
