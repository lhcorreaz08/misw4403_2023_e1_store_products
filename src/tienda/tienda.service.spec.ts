/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';
import { faker } from '@faker-js/faker';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendaList: TiendaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tiendaList = [];
    for (let i = 0; i < 5; i++) {
      const tienda: TiendaEntity = await repository.save({
        nombre: faker.name.firstName(),
        ciudad: "BOG",
        direccion: faker.address.streetAddress()})
      tiendaList.push(tienda);
    }
  }
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('findAll should return all tiendas', async () => {
    const result = await service.findAll();
    expect(result).not.toBeNull();
  });

  it('findOne should return a tienda by id', async () => {
    const storedStore: TiendaEntity = tiendaList[0];
    const tienda: TiendaEntity = await service.findOne(storedStore.id);
    expect(tienda).not.toBeNull();
  });

  it('create should return a new tienda', async () => {
    const tienda: TiendaEntity = {
      id: "",
      nombre: faker.name.firstName(),
      ciudad: "BOG",
      direccion: faker.address.streetAddress(),
      productos: []
    }

    const newTienda: TiendaEntity = await service.create(tienda);
    expect(newTienda).not.toBeNull();
  });

  it('update should return an updated tienda', async () => {
    const storedStore: TiendaEntity = tiendaList[0];
    storedStore.nombre = faker.name.firstName();
    const updatedTienda: TiendaEntity = await service.update(storedStore.id, storedStore);
    expect(updatedTienda).not.toBeNull();
  });

  it('remove should return a deleted tienda', async () => {
    const storedStore: TiendaEntity = tiendaList[0];
    await service.delete(storedStore.id);
    
    const deletedTienda: TiendaEntity = await repository.findOne( {where: {id: storedStore.id}} );
    expect(deletedTienda).toBeNull();    
  });


});

