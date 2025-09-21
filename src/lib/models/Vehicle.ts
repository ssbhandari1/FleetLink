import mongoose, { Schema } from 'mongoose';

const VehicleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  capacityKg: {
    type: Number,
    required: true,
  },
  tyres: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});

const Vehicle = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);

export default Vehicle;