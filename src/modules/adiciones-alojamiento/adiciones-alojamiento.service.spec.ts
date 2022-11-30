import { Test, TestingModule } from '@nestjs/testing';
import { AdicionesAlojamientoService } from './adiciones-alojamiento.service';

describe('AdicionesAlojamientoService', () => {
  let service: AdicionesAlojamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdicionesAlojamientoService],
    }).compile();

    service = module.get<AdicionesAlojamientoService>(AdicionesAlojamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
