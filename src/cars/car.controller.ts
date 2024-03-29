import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { CarsService } from './car.service';
import { CreateCarDto } from './dtos/create-car-dto';
import { UpdateCarDto } from './dtos/update-car-dto';
import { Car } from './schema/car.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService) { }

    @Post()
    async create(@Body() createCarDto: CreateCarDto) {
        try {
            const newCar = await this.carsService.create(createCarDto);
            return { message: 'Car created successfully', car: newCar };
        } catch (error) {
            throw new HttpException('Failed to create car', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':licensePlate')
    async findOne(@Param('licensePlate') licensePlate: string) {
        try {
            const car = await this.carsService.findOne(licensePlate);
            return car ? car : { message: 'Car not found' };
        } catch (error) {
            throw new HttpException('Failed to find car', HttpStatus.NOT_FOUND);
        }
    }

    @Get()
    async findAll() {
        try {
            const cars = await this.carsService.findAll();
            return cars;
        } catch (error) {
            throw new HttpException('Failed to find cars', HttpStatus.NOT_FOUND);
        }
    }

    @Put(':licensePlate')
    async update(@Param('licensePlate') licensePlate: string, @Body() updateCarDto: UpdateCarDto) {
        try {
            const updatedCar = await this.carsService.update(licensePlate, updateCarDto);
            return { message: 'Car updated successfully', car: updatedCar };
        } catch (error) {
            throw new HttpException('Failed to update car', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':licensePlate')
    async delete(@Param('licensePlate') licensePlate: string) {
        try {
            await this.carsService.delete(licensePlate);
            return { message: 'Car deleted successfully' };
        } catch (error) {
            throw new HttpException('Failed to delete car', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
