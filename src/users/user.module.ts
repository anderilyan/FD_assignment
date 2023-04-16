import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { HttpModule } from '@nestjs/axios';
import { UserExternalService } from './user-external.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HttpModule],
  providers: [UserService, UserExternalService],
  controllers: [UserController],
})
export class UserModule {}
