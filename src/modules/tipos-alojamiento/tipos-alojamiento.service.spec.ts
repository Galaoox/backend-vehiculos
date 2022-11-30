import { Test, TestingModule } from '@nestjs/testing';
import { TiposAlojamientoService } from './tipos-alojamiento.service';

describe('TiposAlojamientoService', () => {
  let service: TiposAlojamientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposAlojamientoService],
    }).compile();

    service = module.get<TiposAlojamientoService>(TiposAlojamientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
