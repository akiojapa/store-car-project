import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dtos/create-car-dto';
import { Car } from './schema/car.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = new this.carModel(createCarDto);
    return await car.save();
  }

  async findOne(licensePlate: string): Promise<Car | null> {
    return await this.carModel.findOne({ licensePlate }).exec();
  }

  async findAll(): Promise<Car[]> {
    return await this.carModel.find().exec();
  }

  async update(licensePlate: string, updateCarDto: Partial<CreateCarDto>): Promise<Car> {
    return await this.carModel.findOneAndUpdate({ licensePlate }, updateCarDto, { new: true }).exec();
  }

  async delete(licensePlate: string): Promise<void> {
    await this.carModel.findOneAndDelete({ licensePlate }).exec();
  }
}
