/* eslint-disable prettier/prettier */
import { ProductoEntity } from 'src/producto/producto.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable } from 'typeorm';


@Entity()
export class TiendaEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nombre: string;
    
    @Column()
    ciudad: string;
    
    @Column()
    direccion: string;

    @ManyToMany(() => ProductoEntity, producto => producto.tiendas)
    @JoinTable()
    productos: ProductoEntity[];


}
