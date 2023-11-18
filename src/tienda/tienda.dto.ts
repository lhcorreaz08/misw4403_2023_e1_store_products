/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';

export class TiendaDto {

@IsString()
@IsNotEmpty()
nombre: string;

@IsString()
@IsNotEmpty()
direccion: string;

@IsString()
@IsNotEmpty()
ciudad: string;


}
