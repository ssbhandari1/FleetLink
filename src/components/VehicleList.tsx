// src/components/VehicleList.tsx
'use client';

import { Vehicle } from '@/data/dummyData';


interface VehicleListProps {
  vehicles: Vehicle[];
  onBook?: (vehicleId: string) => void;
  bookingInProgress?: string | null;
  showBookButton?: boolean;
  estimatedDuration?: number;
}

export default function VehicleList({ 
  vehicles, 
  onBook, 
  bookingInProgress, 
  showBookButton = true,
  estimatedDuration 
}: VehicleListProps) {
  if (vehicles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No vehicles found</div>
        <p className="text-gray-400 mt-2">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map(vehicle => (
        <div key={vehicle._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {vehicle.image ? (
              <img 
                src={'/truck.jpg'} 
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={'/truck.jpg'} 
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              // <div className="text-gray-400">Vehicle Image</div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-xl text-blue-400 font-semibold mb-2">{vehicle.name}</h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Capacity:</span> {vehicle.capacityKg} kg
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Tyres:</span> {vehicle.tyres}
            </p>
            {estimatedDuration && (
              <p className="text-gray-600 mb-3">
                <span className="font-medium">Estimated Duration:</span> {estimatedDuration} hours
              </p>
            )}
            {vehicle.description && (
              <p className="text-gray-500 text-sm mb-4">{vehicle.description}</p>
            )}
            
            {showBookButton && onBook && (
              <button
                onClick={() => onBook(vehicle._id)}
                disabled={bookingInProgress === vehicle._id}
                className={`w-full py-2 px-4 rounded transition-colors ${
                  bookingInProgress === vehicle._id 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {bookingInProgress === vehicle._id ? 'Booking...' : 'Book Now'}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}