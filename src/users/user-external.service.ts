import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, firstValueFrom, catchError } from 'rxjs';
import { error } from 'console';
import { CreateUserDto, UserDto } from './user.dto';

@Injectable()
export class UserExternalService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly httpService: HttpService,
  ) {}
  async findAll(page: number): Promise<any[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`https://reqres.in/api/users?page=${page}`).pipe(
        catchError(() => {
          throw 'Failed to fetch users';
        }),
      ),
    );

    try {
      this.insertData(data.data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  insertData(data: UserDto[]) {
    const insertUsers = this.userRepository.create(data);
    this.userRepository.save(insertUsers);
  }
}
