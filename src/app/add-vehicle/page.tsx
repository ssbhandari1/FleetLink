'use client';

import VehicleForm from '@/components/VehicleForm';
import VehicleList from '@/components/VehicleList';
import { vehicleAPI } from '@/lib/service/apiService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);



    const handleAddVehicle = async (vehicleData: {
        name: string;
        capacityKg: number;
        tyres: number;
        description: string;
    }) => {
        setIsLoading(true);
        setMessage('');

        try {
            await vehicleAPI.addVehicle(vehicleData)
            const res = await vehicleAPI.getAllVehicle()
            setVehicles(res)
            setMessage('Vehicle added successfully!');
            setIsError(false);
        } catch (error) {
            setMessage('Error adding vehicle');
            setIsError(true);
            throw new Error("Error adding vehicle" + error);
        } finally {
            setIsLoading(false);
        }
    };



    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await vehicleAPI.getAllVehicle()
                setVehicles(res)
                console.log("fetchVehicle", res)
            } catch (error) {
                throw new Error("Error fetching all vehicles: " + error);

            }
        }
        fetchVehicle()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <div className='absolute top-3 right-3 z-10 '>
                <button
                    className="w-full py-2 px-4 text-white rounded bg-blue-400 transition-colors cursor-pointer"
                    onClick={() => navigate.push("/book")}
                >
                    Search Vehicle
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

                        <VehicleForm
                            onSubmit={handleAddVehicle}
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
                                Vehicle Management
                            </h2>

                        </div>

                        <VehicleList
                            vehicles={vehicles}
                            onBook={undefined}
                            bookingInProgress={null}
                            showBookButton={false}
                            estimatedDuration={undefined}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}