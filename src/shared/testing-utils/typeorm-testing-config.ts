/* eslint-disable prettier/prettier */
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/
import { TypeOrmModule } from '@nestjs/typeorm';
import {TiendaEntity} from 'src/tienda/tienda.entity';
import {ProductoEntity} from 'src/producto/producto.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [TiendaEntity, ProductoEntity],
   synchronize: true,
   keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([TiendaEntity, ProductoEntity]),
];
/* archivo src/shared/testing-utils/typeorm-testing-config.ts*/