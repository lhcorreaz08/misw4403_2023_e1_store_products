import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './producto.entity';
import { ProductoController } from './producto.controller';

@Module({
    providers: [ProductoService],
    imports: [TypeOrmModule.forFeature([ProductoEntity])],
    controllers: [ProductoController]
})
export class ProductoModule {}
