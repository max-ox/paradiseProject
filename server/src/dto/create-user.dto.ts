import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

    @IsNotEmpty()
    readonly nickname: string;

    @IsNotEmpty()
    readonly itsPIN: string;

    @IsNotEmpty()
    readonly contactLink: string;

    @IsNotEmpty()
    readonly faction: string;

    readonly rank: string;
}
