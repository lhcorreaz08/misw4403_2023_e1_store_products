/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { TiendaDto } from './tienda.dto';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';

@Controller('stores')
@UseInterceptors(BusinessErrorsInterceptor)
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService) {}

    @Get()
    async findAll() {
        return await this.tiendaService.findAll();
    }

    @Get(':storeId')
    async findOne(@Param('storeId') storeId: string) {
        return await this.tiendaService.findOne(storeId);
    }

    @Post()
    async create(@Body() tiendaDto: TiendaDto) {
        const tienda: TiendaEntity = plainToInstance(TiendaEntity, tiendaDto);
        return await this.tiendaService.create(tienda);
    }

    @Put(':storeId')
    async update(@Param('storeId') storeId: string, @Body() tiendaDto: TiendaDto) {
        const tienda: TiendaEntity = plainToInstance(TiendaEntity, tiendaDto);
        return await this.tiendaService.update(storeId, tienda);
    }

    @Delete(':storeId')
    @HttpCode(204)
    async delete(@Param('storeId') storeId: string) {
        return await this.tiendaService.delete(storeId);
    }


}
