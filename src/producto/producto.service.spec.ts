/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { ProductoEntity } from './producto.entity';
import { ProductoService } from './producto.service';
import { faker } from '@faker-js/faker';

describe('ProductoService', () => {
  let service: ProductoService;
  let repository: Repository<ProductoEntity>;
  let productoList: ProductoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
    repository = module.get<Repository<ProductoEntity>>(getRepositoryToken(ProductoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    productoList = [];
    for (let i = 0; i < 5; i++) {
      const producto: ProductoEntity = await repository.save({
        nombre: faker.name.firstName(),
        precio: faker.lorem.word(),
        tipo: 'Perecedero',
      })
      productoList.push(producto);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all productos', async () => {
    const result = await service.findAll();
    expect(result).not.toBeNull();
  });

  it('findOne should return a producto by id', async () => {
    const storedProducto: ProductoEntity = productoList[0];
    const producto: ProductoEntity = await service.findOne(storedProducto.id);
    expect(producto).not.toBeNull();
  });

  it('create should return a new producto', async () => {
    const producto: ProductoEntity = {
      id: "",
      nombre: faker.name.firstName(),
      precio: faker.lorem.word(),
      tipo: 'Perecedero',
      tiendas: []
    };
    const result = await service.create(producto);
    expect(result).not.toBeNull();
  });

  it('update should return an updated producto', async () => {
    const storedProducto: ProductoEntity = productoList[0];
    storedProducto.nombre = faker.name.firstName();
    const updatedProducto: ProductoEntity = await service.update(storedProducto.id, storedProducto);
    expect(updatedProducto).not.toBeNull();
  });              
  
  it('delete should remove a producto', async () => {
    const storedProducto: ProductoEntity = productoList[0];
    await service.delete(storedProducto.id);
    const deletedProducto: ProductoEntity = await repository.findOne({where:{id:storedProducto.id}});
    expect(deletedProducto).toBeNull();
  });




});
