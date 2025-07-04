import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { PokemonService } from 'src/pokemons/shared/pokemon.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cidade } from '../entity/cidade.entity';

@Injectable()
export class CidadeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly pokemonService: PokemonService,
    @InjectRepository(Cidade)
    private readonly cidadeRepository: Repository<Cidade>,
  ) {}

  // essa função busca a temperatura da cidade
  async buscarPokemonPorCidade(cidade: string) {
    const apiKey = '3c2116587db4d1d604c0c32226155e4e';
    const endereco = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric`;

    // passa de observable para promisse
    const resposta = await lastValueFrom(this.httpService.get(endereco)); 
    const dados = resposta.data;
    const temperatura = dados.main.temp;
    const clima = dados.weather[0].main;

    // se o clima for igual a "Rain" o Pokemon será do tipo eletrico
    let tipo: string;
    if (clima.toLowerCase() === 'rain') {
      tipo = 'electric';
    } else {
      tipo = this.definirTipoPokemon(temperatura);
    }

    // declara ser o parametro da função buscar por tipo do Pokemon Service
    const pokemon = await this.pokemonService.buscarPorTipo(tipo);
    
    // salva os dados no bd
    await this.cidadeRepository.save({
      nome: cidade,
      temperatura,
      clima,
      pokemon: {id: pokemon.id},
    });

    // retorna os dados salvos
    return {
      cidade,
      temperatura,
      clima,
      tipoPokemon: tipo,
      pokemon,
    };
  }

  // lista as cidades pesquisadas
  async listarCidades(): Promise<string[]> {
    const cidades = await this.cidadeRepository.find();
    return cidades.map((c) => c.nome);
  }

  // define o tipo de pokemon com base na temperatura
  definirTipoPokemon(temp: number): string {
    if (temp < 5) return 'ice';
    if (temp >= 5 && temp < 10) return 'water';
    if (temp >= 12 && temp <= 15) return 'grass';
    if (temp >= 15 && temp <= 21) return 'ground';
    if (temp >= 23 && temp <= 27) return 'bug';
    if (temp >= 27 && temp <= 33) return 'rock';
    if (temp > 33) return 'fire';
    return 'normal';
  }

  // retorna todas as cidades e seus atributos
  async getAll(): Promise<Cidade[]> {
    return this.cidadeRepository.find();
  }

  // retorna cidade por id
  async getById(id: number): Promise<Cidade> {
    const cidade = await this.cidadeRepository.findOneBy({ id });
    // se cidade for false (nula, em branco), recebe uma exceção
    if (!cidade) {
      throw new NotFoundException(`Cidade com id ${id} não encontrada`);
    }
    return cidade;
  }

  // modifica cidade
  async update(id:number, nome:string): Promise<Cidade> {
    const cidade = await this.getById(id);
    cidade.nome = nome;
    return this.cidadeRepository.save(cidade)
  }

  // deleta cidade
  async delete(id: number): Promise<void> {
    await this.cidadeRepository.delete(id);
  }
}
