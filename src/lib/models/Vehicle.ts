import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVehicle extends Document {
  name: string;
  description: string;
  capacityKg: number;
  tyres: number;
}

const vehicleSchema = new Schema<IVehicle>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  capacityKg: { type: Number, required: true },
  tyres: { type: Number, required: true },
});

const Vehicle: Model<IVehicle> =
  mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;
