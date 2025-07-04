import { Pokemon } from "src/pokemons/entity/pokemon.entity";
import { Entity, Column, PrimaryGeneratedColumn, Double, CreateDateColumn, ManyToOne  } from "typeorm";

@Entity()
export class Cidade {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column('float')
    temperatura: number;

    @Column()
    clima: string;

    @CreateDateColumn()
    dataConsulta: Date;

    @ManyToOne(() => Pokemon, {eager: true}) 
    pokemon: Pokemon
}