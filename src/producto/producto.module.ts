import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './producto.entity';

@Module({
    providers: [ProductoService],
    imports: [TypeOrmModule.forFeature([ProductoEntity])]
})
export class ProductoModule {}
