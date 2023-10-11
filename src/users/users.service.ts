import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOneByUsername(Username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ where: { Username } });
    if (!user) {
      return null;
    }
    return user;
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(userData: Partial<UserEntity>): Promise<void> {
    if (!userData.Password || typeof userData.Password !== 'string') {
      throw new Error('Password is required and must be a string');
    }

    userData.Password = await bcrypt.hash(userData.Password, 10);
    await this.userRepository.save(userData);
  }

  async update(id: string, updateData: Partial<UserEntity>): Promise<void> {
    await this.userRepository.update(id, updateData);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
