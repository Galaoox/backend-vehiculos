import { Test, TestingModule } from '@nestjs/testing';
import { AdicionesAlojamientoController } from './adiciones-alojamiento.controller';

describe('AdicionesAlojamientoController', () => {
  let controller: AdicionesAlojamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdicionesAlojamientoController],
    }).compile();

    controller = module.get<AdicionesAlojamientoController>(AdicionesAlojamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
