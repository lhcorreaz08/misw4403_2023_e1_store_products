/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { TiendaProductoService } from './tienda-producto.service';
import { Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductoDto } from 'src/producto/producto.dto';
import { ProductoEntity } from 'src/producto/producto.entity';



@Controller('tienda-producto')
@UseInterceptors(BusinessErrorsInterceptor)
export class TiendaProductoController {
    constructor(private readonly tiendaProductoService: TiendaProductoService) {}

    @Post(':storeId/products/:productId')
    async addStoreToProduct(@Param('storeId') storeId: string, @Param('productId') productId: string) {
        return await this.tiendaProductoService.addStoreToProduct(storeId, productId);
    }

    @Get(':storeId/products/:productId')
    async findProdctByStoreIdProductId(@Param('storeId') storeId: string, @Param('productId') productId: string) {
        return await this.tiendaProductoService.findProdctByStoreIdProductId(storeId, productId);
    }

    @Get(':storeId/products')
    async findProductsByStoreId(@Param('storeId') storeId: string) {
        return await this.tiendaProductoService.findProductsByStoreId(storeId);
    }

    @Put(':storeId/products')
    async associateProductsToStore(@Param() ProductoDto: ProductoDto[], @Param('storeId') storeId: string) {
        const productos = plainToInstance(ProductoEntity, ProductoDto)
        return await this.tiendaProductoService.associateProductsToStore(storeId, productos);
    }

    @Delete(':storeId/products/:productId')
    @HttpCode(204)
    async delete(@Param('storeId') storeId: string, @Param('productId') productId: string) {
        return await this.tiendaProductoService.removeStoreFromProduct(storeId, productId);
    }


}
