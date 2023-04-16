import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class UserDtoBody {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UserDto {
  @ApiProperty({
    description: 'User email',
    default: 'test@gmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    default: 'User',
  })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    default: 'Test',
  })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    default: null,
    required: false,
  })
  @IsOptional()
  avatar: string;
}

export class CreateUserDto extends UserDto {
  @ApiProperty({
    default: new Date(),
  })
  @IsOptional()
  created_at: Date;

  @ApiProperty({
    default: new Date(),
  })
  @IsOptional()
  updated_at: Date;

  @ApiProperty({
    default: new Date(),
  })
  @IsOptional()
  deleted_at: Date;
}

export class UpdateUserDto extends UserDto {
  @ApiProperty({
    default: 1,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    default: new Date(),
  })
  @IsOptional()
  updated_at: Date;
}

export class UserFetchQuery {
  @IsNumberString()
  @IsNotEmpty()
  page: number;
}
