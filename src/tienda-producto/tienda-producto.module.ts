/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from 'src/producto/producto.entity';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { TiendaProductoService } from './tienda-producto.service';


@Module({
    providers: [TiendaProductoService],
    imports: [TypeOrmModule.forFeature([TiendaEntity, ProductoEntity])]
})
export class TiendaProductoModule {}
