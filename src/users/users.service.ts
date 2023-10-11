import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Partial<User>[]> {
    return await this.userRepository.find({ select: ['Username', 'Name', 'Vorname'] });
  }

  async findOneByUsername(Username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { Username } });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(userData: Partial<User>): Promise<void> {
    if (!userData.Password || typeof userData.Password !== 'string') {
      throw new Error('Password is required and must be a string');
    }

    userData.Password = await bcrypt.hash(userData.Password, 10);
    await this.userRepository.save(userData);
  }

  async update(id: string, updateData: Partial<User>): Promise<void> {
    await this.userRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
