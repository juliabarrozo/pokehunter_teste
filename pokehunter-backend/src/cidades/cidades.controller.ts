import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { CidadeService } from './shared/cidade.service';

@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadeService: CidadeService) {}

    // lista os nomes das cidades
    @Get('nomes')
    async listarNomes(): Promise<string[]> {
    return this.cidadeService.listarCidades(); 
    }
 
    // retorna um pokemon ao procurar uma cidade
    @Get('pokemon')
    async buscar(@Query('nome') nome: string) {
    return this.cidadeService.buscarPokemonPorCidade(nome);
    }

    // retorna cidades com todos os atributos
    @Get()
    async getAll() {
        return this.cidadeService.getAll();
    }

    // retorna cidade por id
    @Get('id')
    async getById(@Param('id') id: number) {
      return this.cidadeService.getById(id);
    }

    // modifica o objeto inteiro e o retorna
    @Put('id')
    async update(@Param('id') id: number, @Body() nome: string) {
      return this.cidadeService.update(Number(id), nome);
    }

    // deleta o objeto
    @Delete('id') 
    async delete(@Param('id') id: number) {
      this.cidadeService.delete(id);
    }
    
}

