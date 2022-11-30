import { Module } from '@nestjs/common';
import { AdicionesAlojamientoController } from './adiciones-alojamiento.controller';
import { AdicionesAlojamientoService } from './adiciones-alojamiento.service';

@Module({
  controllers: [AdicionesAlojamientoController],
  providers: [AdicionesAlojamientoService]
})
export class AdicionesAlojamientoModule {}
