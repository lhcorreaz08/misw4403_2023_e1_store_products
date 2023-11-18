/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from 'src/producto/producto.entity';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { TiendaProductoService } from './tienda-producto.service';
import { TiendaProductoController } from './tienda-producto.controller';


@Module({
    providers: [TiendaProductoService],
    imports: [TypeOrmModule.forFeature([TiendaEntity, ProductoEntity])],
    controllers: [TiendaProductoController]
})
export class TiendaProductoModule {}
