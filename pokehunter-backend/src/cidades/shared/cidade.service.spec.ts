import { Test, TestingModule } from '@nestjs/testing';
import { CidadeService } from './cidade.service';

describe('CidadeService', () => {
  let provider: CidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CidadeService],
    }).compile();

    provider = module.get<CidadeService>(CidadeService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
