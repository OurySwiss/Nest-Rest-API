import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity("Books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Titel: string;

  @Column()
  Erscheinungsjahr: number;
}
