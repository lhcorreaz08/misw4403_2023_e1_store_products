/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from 'src/producto/producto.entity';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class TiendaProductoService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>,

        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>,
    ) {}

    async addStoreToProduct(storeId: string, productId: string): Promise<ProductoEntity> {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where:{id:storeId}});
        if (!tienda) 
            throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
        
        const producto: ProductoEntity = await this.productoRepository.findOne({where:{id:productId}});
        if (!producto) 
            throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
        
        producto.tiendas = [...producto.tiendas, tienda];
        return await this.productoRepository.save(producto);
    }

    async findProdctByStoreIdProductId(storeId: string, productId: string): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id: productId}});
        if (!producto) 
            throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND); 

        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id:storeId}, relations: ["productos"]});
        if (!tienda) 
            throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);

        const storeProduct: ProductoEntity = tienda.productos.find(e => e.id === productId);

        if (!storeProduct) 
            throw new BusinessLogicException("The product with the given id was not found in the store", BusinessError.NOT_FOUND);

        return storeProduct;

    }

    async findProductsByStoreId(storeId: string): Promise<ProductoEntity[]> {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id:storeId}, relations: ["productos"]});
        if (!tienda) 
            throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
        
        return tienda.productos;
    }


    async associateProductsToStore(storeId: string, products: ProductoEntity[]): Promise<TiendaEntity> {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: storeId}, relations: ["productos"]});
        if (!tienda) 
            throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);

        for (let i = 0; i < products.length; i++){
            const producto: ProductoEntity = await this.productoRepository.findOne({where:{id:products[i].id}});
            if (!producto) 
                throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);          
        }

        tienda.productos = products;
        return await this.tiendaRepository.save(tienda);    

    }

    async removeStoreFromProduct(storeId: string, productId: string): Promise<ProductoEntity> {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id:storeId}, relations: ["productos"]});
        if (!tienda) 
            throw new BusinessLogicException("The store with the given id was not found", BusinessError.NOT_FOUND);
        
        const producto: ProductoEntity = await this.productoRepository.findOne({where:{id:productId}});
        if (!producto) 
            throw new BusinessLogicException("The product with the given id was not found", BusinessError.NOT_FOUND);
        
        producto.tiendas = producto.tiendas.filter(e => e.id !== storeId);
        return await this.productoRepository.save(producto);
    }



}
