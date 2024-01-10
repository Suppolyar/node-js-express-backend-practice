import { IsEmail, IsString } from 'class-validator'

export class UserRegisterDto {
  @IsEmail({}, { message: 'Incorrect Email' })
    email: string

  @IsString({ message: 'Enter a password' })
    password: string

  @IsString({ message: 'Enter a name' })
    name: string
}
