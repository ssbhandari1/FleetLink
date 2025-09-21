// src/components/VehicleForm.tsx
'use client';

import { useState } from 'react';

interface VehicleFormProps {
  onSubmit: (vehicleData: {
    name: string;
    capacityKg: number;
    tyres: number;
    description:string;
  }) => void;
  isLoading?: boolean;
}

export default function VehicleForm({ onSubmit, isLoading = false }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    capacityKg: '',
    tyres: '',
    description:""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      capacityKg: Number(formData.capacityKg),
      tyres: Number(formData.tyres),
      description: formData.description
    });
    setFormData({
      name: '',
      capacityKg: '',
      tyres: '',
      description:""
    })
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl text-gray-700 font-semibold mb-4">Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Vehicle Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Ford Transit"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Capacity (KG)</label>
          <input
            type="number"
            name="capacityKg"
            value={formData.capacityKg}
            onChange={handleChange}
            required
            className="w-full p-2 border text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1200"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Number of Tyres</label>
          <input
            type="number"
            name="tyres"
            value={formData.tyres}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300  text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 4"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 4"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Adding Vehicle...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
}