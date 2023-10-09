import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity("Autor")
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Fullname: string;

  @Column()
  Birthdate: Date;
}
