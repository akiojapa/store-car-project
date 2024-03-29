import { Module } from '@nestjs/common';
import { CarsService } from './car.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schema/car.schema';
import { CarsController } from './car.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }])],
  providers: [CarsService],
  exports: [CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
