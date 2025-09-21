import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/lib/models/Vehicle';
import Booking from '@/lib/models/Booking';
import { calculateRideDuration, calculateEndTime } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    console.log('availble111',request.url)
    const { searchParams } = new URL(request.url);
    const capacityRequired = Number(searchParams.get('capacityRequired'));
    const fromPincode = searchParams.get('fromPincode');
    const toPincode = searchParams.get('toPincode');
    const startTimeStr = searchParams.get('startTime');
    console.log('availble2222',searchParams)
    
    // Validation
    if (!capacityRequired || !fromPincode || !toPincode || !startTimeStr) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }
    
    const startTime = new Date(startTimeStr);
    if (isNaN(startTime.getTime())) {
      return NextResponse.json(
        { error: 'Invalid startTime format' },
        { status: 400 }
      );
    }
    

    const estimatedRideDurationHours = calculateRideDuration(fromPincode, toPincode);
    const endTime = calculateEndTime(startTime, estimatedRideDurationHours);
    
    const capableVehicles = await Vehicle.find({
      capacityKg: { $gte: capacityRequired }
    });
    console.log('capableVehicles11',capableVehicles)
    const availableVehicles = [];
    
    for (const vehicle of capableVehicles) {
      const overlappingBooking = await Booking.findOne({
        vehicleId: vehicle._id,
        $or: [
          { 
            startTime: { $lt: endTime }, 
            endTime: { $gt: startTime } 
          }
        ]
      });
      console.log('overlappingBooking11',overlappingBooking)
      if (!overlappingBooking) {
        availableVehicles.push({
          ...vehicle.toObject(),
          estimatedRideDurationHours
        });
      }
    }
    console.log('availableVehicles211',availableVehicles)
    return NextResponse.json(availableVehicles);
  } catch (error) {
    console.error('Error fetching available vehicles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}