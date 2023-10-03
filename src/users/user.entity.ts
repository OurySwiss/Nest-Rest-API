import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
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
