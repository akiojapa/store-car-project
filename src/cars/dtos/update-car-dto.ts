import { IsString, IsOptional, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateCarDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    readonly brand?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    readonly model?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    readonly color?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(17)
    readonly licensePlate?: string;
}
