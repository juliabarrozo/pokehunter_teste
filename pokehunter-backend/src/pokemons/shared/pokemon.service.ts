import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';
import { Pokemon } from '../entity/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    private readonly httpService: HttpService,
  ) {}

  // recebe o tipo estabelecido em Cidade Service para procurar o pokemon
  async buscarPorTipo(tipo: string): Promise<Pokemon> {
    // verifica se existe um Pokémon desse tipo salvo no banco
    const pokemonSalvo = await this.pokemonRepository.findOneBy({ tipo });
    if (pokemonSalvo) {
      return pokemonSalvo;
    }

    // busca na API por tipo
    const url = `https://pokeapi.co/api/v2/type/${tipo}`;
    const resposta = await lastValueFrom(this.httpService.get(url));
    const pokemons = resposta.data.pokemon;

    // escolhe um pokemon aleatorio daquele tipo
    const escolhido = pokemons[Math.floor(Math.random() * pokemons.length)];
    const nomePokemon = escolhido.pokemon.name;

    // cria ele no banco e salva
    const novo = this.pokemonRepository.create({
      nome: nomePokemon,
      tipo,
    });
    await this.pokemonRepository.save(novo);

    return nomePokemon;
  }

  // retorna todos os pokemons
  async getAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  // retorna o pokemon por id
  async getById(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOneBy({id});
    // faz um tratamento de exceção caso pokemon seja nulo/vazio
    if (! pokemon) {
      throw new NotFoundException(`Pokemon com id ${id} não encontrado`);
    }
    return pokemon;
  }

  // modifica o pokemon
  async update(id: number, dados: Partial<Pokemon>): Promise<Pokemon> {
    const pokemon = await this.getById(id);
    pokemon.nome = dados.nome ?? pokemon.nome;
    pokemon.tipo = dados.tipo ?? pokemon.tipo;
    return this.pokemonRepository.save(pokemon);
  }

  // deleta o pokemon
  async delete(id: number): Promise<void> {
    await this.pokemonRepository.delete(id);
  }

}
