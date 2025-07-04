import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let provider: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService],
    }).compile();

    provider = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

