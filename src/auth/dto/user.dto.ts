import { IsEmail, IsNotEmpty, validate, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  readonly password: string;

  readonly hccode: string;
  @ApiModelProperty()
  @IsNotEmpty()

  @ApiModelProperty()
  @IsNotEmpty()
  readonly dateOfBirth: string;
}
