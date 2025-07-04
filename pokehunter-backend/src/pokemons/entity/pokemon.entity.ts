import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Pokemon{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    tipo: string;
}