import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateFactionDto {
    @IsNotEmpty()
    readonly name: string;
}
