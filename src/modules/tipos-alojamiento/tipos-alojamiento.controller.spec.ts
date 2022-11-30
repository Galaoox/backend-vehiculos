import { Test, TestingModule } from '@nestjs/testing';
import { TiposAlojamientoController } from './tipos-alojamiento.controller';

describe('TiposAlojamientoController', () => {
  let controller: TiposAlojamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposAlojamientoController],
    }).compile();

    controller = module.get<TiposAlojamientoController>(TiposAlojamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
