import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/lib/models/Vehicle';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    if (!body.name || !body.capacityKg || !body.tyres || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (typeof body.capacityKg !== 'number' || typeof body.tyres !== 'number') {
      return NextResponse.json(
        { error: 'Capacity and tyres must be numbers' },
        { status: 400 }
      );
    }
    
    const vehicle = new Vehicle(body);
    await vehicle.save();
    
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('Error creating vehicle:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}