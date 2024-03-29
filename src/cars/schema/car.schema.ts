import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema({ timestamps: true })
export class Car {
    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true, unique: true })
    licensePlate: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
