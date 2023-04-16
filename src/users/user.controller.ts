import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserDtoBody } from './user.dto';
import { User } from './user.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserExternalService } from './user-external.service';
import { AuthGuard } from 'src/guards/auth.guards';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userExternalService: UserExternalService,
  ) {}

  @Get('/fetch')
  public fetchUser(
    @Query(
      'page',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    page: number,
  ): any {
    return this.userExternalService.findAll(page);
  }

  @Post('/')
  public async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get('/')
  public async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get('/:userId')
  public async getUser(
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
  ) {
    return await this.userService.getUser(userId);
  }

  @Put('/')
  public async editUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.editUser(updateUserDto.id, updateUserDto);
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  public async deleteUser(@Body() BodyRequest: UserDtoBody) {
    return await this.userService.deleteUser(BodyRequest.id);
  }
}
