import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectConnection() private connection: Connection) {}

  async findAll() {
    const query = `
      SELECT Books.Id, Books.Titel, Books.Erscheinungsjahr, Autor.FullName as Autor 
      FROM Books 
      JOIN Autor ON Books.AutorID = Autor.ID
    `;
    return await this.connection.query(query);
  }

  async findOne(id: number) {
    const query = `
      SELECT Books.Id, Books.Titel, Books.Erscheinungsjahr, Autor.FullName as Autor 
      FROM Books 
      JOIN Autor ON Books.AutorID = Autor.ID
      WHERE Books.Id = ?
    `;
    const result = await this.connection.query(query, [id]);
    if (result.length > 0) {
      return result[0];
    } else {
      throw new NotFoundException('Book not found');
    }
  }

  async create(bookData: any) {
    const newBook = {
      Titel: bookData.Titel,
      Erscheinungsjahr: bookData.Erscheinungsjahr,
      AutorID: bookData.AutorID,
    };
    const query = 'INSERT INTO Books SET ?';
    await this.connection.query(query, [newBook]);
  }

  async update(id: number, updateData: any) {
    const query = `
      UPDATE Books 
      SET 
        Titel = ?, 
        Erscheinungsjahr = ?, 
        AutorID = ? 
      WHERE Id = ?
    `;
    await this.connection.query(query, [
      updateData.Titel,
      updateData.Erscheinungsjahr,
      updateData.AutorID,
      id,
    ]);
  }

  async remove(id: number) {
    const query = 'DELETE FROM Books WHERE Id = ?';
    await this.connection.query(query, [id]);
  }
}
