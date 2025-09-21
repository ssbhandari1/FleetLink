// src/components/SearchForm.tsx
'use client';

import { useState } from 'react';

interface SearchFormProps {
  onSearch: (searchData: {
    capacityRequired: string;
    fromPincode: string;
    toPincode: string;
    startTime: string;
  }) => void;
  isLoading?: boolean;
}

export default function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [formData, setFormData] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl text-gray-700 font-semibold mb-4">Search Available Vehicles</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Capacity Required (KG)</label>
          <input
            type="number"
            name="capacityRequired"
            value={formData.capacityRequired}
            onChange={handleChange}
            required
            className="w-full p-2 border  text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">From Pincode</label>
          <input
            type="text"
            name="fromPincode"
            value={formData.fromPincode}
            onChange={handleChange}
            required
            className="w-full p-2 border  text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Starting location pincode"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">To Pincode</label>
          <input
            type="text"
            name="toPincode"
            value={formData.toPincode}
            onChange={handleChange}
            required
            className="w-full p-2 border  text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Destination pincode"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full p-2 border  text-gray-700 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Searching...' : 'Search Availability'}
        </button>
      </form>
    </div>
  );
}