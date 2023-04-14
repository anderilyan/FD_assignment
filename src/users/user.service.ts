import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
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
    return await this.userRepository.findOne({
      where: { id: userId },
    });
  }

  public async editUser(
    userId: number,
    createUserDto: CreateUserDto,
  ): Promise<User> {
    const editedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    const result = await this.userRepository.update(
      { id: userId },
      createUserDto,
    );
    console.log(result);
    return editedUser;
  }

  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
