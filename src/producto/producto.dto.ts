/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';

export class ProductoDto {

@IsString()
@IsNotEmpty()
nombre: string;

@IsString()
@IsNotEmpty()
precio: string;

@IsString()
@IsNotEmpty()
tipo: string;


}
