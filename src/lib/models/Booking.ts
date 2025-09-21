import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  vehicleId: mongoose.Types.ObjectId; // reference to Vehicle
  fromPincode: string;
  toPincode: string;
  startTime: Date;
  endTime: Date;
  customerId: string;
}

const bookingSchema = new Schema<IBooking>(
  {
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
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
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
