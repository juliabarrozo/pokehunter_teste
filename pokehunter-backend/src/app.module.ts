import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CidadesModule } from './cidades/cidades.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemons/entity/pokemon.entity';
import { Cidade } from './cidades/entity/cidade.entity';

@Module({
  imports: [
    // modulo de requisição http
    HttpModule,
    // modulo para conectar com banco de dados e chaves para conexão
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'julia2006',
      database: 'pokehunter',
      entities: [Pokemon, Cidade],
      synchronize: true,
    }), CidadesModule, PokemonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
