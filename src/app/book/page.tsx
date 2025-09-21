'use client';

import SearchForm from '@/components/SearchForm';
import { SearchDataType } from '@/components/types';
import VehicleList from '@/components/VehicleList';
import { vehicleAPI } from '@/lib/service/apiService';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Vehicle {
    _id: string;
    name: string;
    capacityKg: number;
    tyres: number;
    estimatedRideDurationHours: number;
}

export default function Book() {
    const navigate = useRouter();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bookingInProgress, setBookingInProgress] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [estimatedDuration, setEstimatedDuration] = useState<number | undefined>();
    const [searchCriteria, setSearchCriteria] = useState<SearchDataType>()

    const handleSearch = async (searchData: SearchDataType) => {
        setIsLoading(true);
        setMessage('');

        try {
            const capacity = parseInt(searchData.capacityRequired);
            if (isNaN(capacity) || capacity <= 0) {
                throw new Error('Capacity must be a positive number');
            }

            if (!searchData.fromPincode.trim() || !searchData.toPincode.trim()) {
                throw new Error('Pincodes are required');
            }

            const startTime = new Date(searchData.startTime);
            if (isNaN(startTime.getTime())) {
                throw new Error('Invalid start time');
            }

            const isoStartTime = startTime.toISOString();

            const availableVehicles = await vehicleAPI.searchAvailable({
                capacityRequired: capacity,
                fromPincode: searchData.fromPincode,
                toPincode: searchData.toPincode,
                startTime: isoStartTime,
            });

            setVehicles(availableVehicles);
            setSearchCriteria(searchData)

            if (availableVehicles.length > 0) {
                setEstimatedDuration(availableVehicles[0].estimatedRideDurationHours);
            } else {
                setEstimatedDuration(undefined);
            }

            setMessage(availableVehicles.length === 0
                ? 'No vehicles available for your criteria'
                : `Found ${availableVehicles.length} vehicles`);
            setIsError(false);
        } catch (error: unknown) {
            setMessage('Error searching vehicles');
            setIsError(true);
            setVehicles([]);
            setEstimatedDuration(undefined);
            throw new Error("Error searching vehicles" + error);
        } finally {
            setIsLoading(false);
        }
    }




    const handleBookVehicle = async (vehicleId: string) => {
        setBookingInProgress(vehicleId);
        setMessage('');

        try {
            const bookingData = {
                vehicleId,
                fromPincode: searchCriteria?.fromPincode,
                toPincode: searchCriteria?.toPincode,
                startTime: new Date(searchCriteria?.startTime).toISOString(),
            };

            const booking = await vehicleAPI.bookVehicle(bookingData);

            const vehicle = vehicles.find(v => v._id === vehicleId);
            setMessage(`Successfully booked ${vehicle?.name}! Booking ID: ${booking._id}`);
            setIsError(false);
            setVehicles([]);
        } catch (error) {
            if (error.response?.status === 409) {
                setMessage('Vehicle is no longer available. Please search again.');
            } else {
                setMessage(error.message || 'Failed to book vehicle');
            }
            setIsError(true);
        } finally {
            setBookingInProgress(null);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <div className='absolute top-3 right-3 z-10 '>
                <button
                    className="w-full py-2 px-4 text-white rounded bg-blue-400 transition-colors cursor-pointer"
                    onClick={() => navigate.push("/add-vehicle")}
                >
                    Add Vehicle
                </button>
            </div>
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">FleetLink</h1>
                    <p className="text-gray-600">Logistics Vehicle Booking System</p>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/3">

                        <SearchForm
                            onSearch={handleSearch}
                            isLoading={isLoading}
                        />


                        {message && (
                            <div className={`mt-4 p-4 rounded-lg ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </div>
                        )}
                    </aside>

                    {/* Main Content */}
                    <main className="w-full lg:w-2/3">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Available Vehicles
                            </h2>
                            {vehicles.length > 0 && (
                                <span className="text-gray-600">
                                    {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} found
                                </span>
                            )}
                        </div>

                        <VehicleList
                            vehicles={vehicles}
                            onBook={ handleBookVehicle}
                            bookingInProgress={bookingInProgress}
                            showBookButton={true}
                            estimatedDuration={estimatedDuration}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}