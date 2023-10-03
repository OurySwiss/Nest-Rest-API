import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectConnection() private connection: Connection) {}

  async findAll() {
    const query = 'SELECT * FROM User';
    return await this.connection.query(query);
  }

  async findOne(id: string) {
    const query = 'SELECT * FROM User WHERE Id = ?';
    const result = await this.connection.query(query, [id]);
    if (result.length > 0) {
      return result[0];
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByUsername(username: string) {
    const query = 'SELECT * FROM User WHERE Username = ?';
    const result = await this.connection.query(query, [username]);
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }

  async create(userData: any) {
    if (!userData.Password || typeof userData.Password !== 'string') {
      throw new Error('Password is required and must be a string');
    }

    const hashedPassword = await bcrypt.hash(userData.Password, 10);

    userData.Password = hashedPassword;

    const query = 'INSERT INTO User SET ?';
    await this.connection.query(query, [userData]);
  }

  async update(id: string, updateData: any) {
    const query = `
      UPDATE User 
      SET 
        Username = ?, 
        Password = ?, 
        Name = ?, 
        Vorname = ?, 
        Alter = ?, 
        Geschlecht = ? 
      WHERE Id = ?
    `;
    await this.connection.query(query, [
      updateData.Username,
      updateData.Password,
      updateData.Name,
      updateData.Vorname,
      updateData.Alter,
      updateData.Geschlecht,
      id,
    ]);
  }

  async remove(id: string) {
    const query = 'DELETE FROM User WHERE Id = ?';
    await this.connection.query(query, [id]);
  }
}
