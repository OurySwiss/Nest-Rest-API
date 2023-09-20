import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Titel: string;

  @Column()
  Erscheinungsjahr: number;

  @Column()
  AutorID: number;
}
