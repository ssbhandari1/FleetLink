import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vehicle from '@/lib/models/Vehicle';


export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
   const vehicles = await Vehicle.find()
    
    return NextResponse.json(vehicles, { status: 200 });
  } catch (error) {
    console.error('Error fetching available vehicles:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}