import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/lib/models/Booking';
import Vehicle from '@/lib/models/Vehicle';
import { calculateRideDuration, calculateEndTime } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { vehicleId, fromPincode, toPincode, startTime } = body;
    
    if (!vehicleId || !fromPincode || !toPincode || !startTime ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return NextResponse.json(
        { error: 'Vehicle not found' },
        { status: 404 }
      );
    }
    
    const estimatedRideDurationHours = calculateRideDuration(fromPincode, toPincode);
    const startTimeDate = new Date(startTime);
    const endTime = calculateEndTime(startTimeDate, estimatedRideDurationHours);
    
    const overlappingBooking = await Booking.findOne({
      vehicleId,
      $or: [
        { 
          startTime: { $lt: endTime }, 
          endTime: { $gt: startTimeDate } 
        }
      ]
    });
    
    if (overlappingBooking) {
      return NextResponse.json(
        { error: 'Vehicle is already booked for this time slot' },
        { status: 409 }
      );
    }
    
    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: startTimeDate,
      endTime,
    });
    
    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}