import { Schema, model, models, Types } from 'mongoose';

const BookingSchema = new Schema({
  vehicleId: {
    type: Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true,
  },
  fromPincode: {
    type: String,
    required: true,
  },
  toPincode: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
});

export default models.Booking || model('Booking', BookingSchema);