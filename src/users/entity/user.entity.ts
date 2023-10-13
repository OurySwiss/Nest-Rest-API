import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Username: string;

  @Column()
  Password: string;

  @Column()
  Name: string;

  @Column()
  Vorname: string;

  @Column()
  Alter: number;

  @Column()
  Geschlecht: string;
}
