// src/data/dummyData.ts
export interface Vehicle {
    _id: string;
    name: string;
    capacityKg: number;
    tyres: number;
    image?: string;
    description?: string;
  }
  
  export const dummyVehicles: Vehicle[] = [
    {
      _id: '1',
      name: 'Ford Transit',
      capacityKg: 1200,
      tyres: 4,
      image: '/api/placeholder/300/200',
      description: 'Medium cargo van perfect for urban deliveries'
    },
    {
      _id: '2',
      name: 'Mercedes Sprinter',
      capacityKg: 2500,
      tyres: 4,
      image: '/api/placeholder/300/200',
      description: 'Large van with excellent fuel efficiency'
    },
    {
      _id: '3',
      name: 'Isuzu NPR',
      capacityKg: 3500,
      tyres: 6,
      image: '/api/placeholder/300/200',
      description: 'Light truck with durable construction'
    },
    {
      _id: '4',
      name: 'Volvo FH16',
      capacityKg: 20000,
      tyres: 10,
      image: '/api/placeholder/300/200',
      description: 'Heavy duty truck for long haul logistics'
    },
    {
      _id: '5',
      name: 'Renault Master',
      capacityKg: 1400,
      tyres: 4,
      image: '/api/placeholder/300/200',
      description: 'Versatile van with multiple configuration options'
    },
    {
      _id: '6',
      name: 'Iveco Daily',
      capacityKg: 3000,
      tyres: 4,
      image: '/api/placeholder/300/200',
      description: 'Reliable workhorse for medium duty applications'
    }
  ];