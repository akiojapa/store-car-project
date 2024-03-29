import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    brand: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    model: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    color: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(17)
    licensePlate: string;
}
