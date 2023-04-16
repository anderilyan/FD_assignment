import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async getUser(userId: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: { id: userId },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  public async editUser(
    userId: number,
    createUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      const editedUser = await this.userRepository.findOneOrFail({
        where: { id: userId },
      });

      await this.userRepository.update({ id: userId }, createUserDto);
      return editedUser;
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  public async deleteUser(userId: number): Promise<string> {
    const res = await this.userRepository.delete(userId);
    if (res.affected == 0) {
      throw new NotFoundException('User not found');
    } else {
      return `userId ${userId} has been deleted`;
    }
  }
}
