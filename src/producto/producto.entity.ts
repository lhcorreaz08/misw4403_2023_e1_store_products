/* eslint-disable prettier/prettier */
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nombre: string;
    
    @Column()
    precio: string;
    
    @Column()
    tipo: string;

    @ManyToMany(() => TiendaEntity, tienda => tienda.productos)
    tiendas: TiendaEntity[];
    


}
