import React, { useState, useEffect } from 'react';
import PackageCard from '../components/PackageCard';
import { getPackages } from '../services/packageService';

const HomePage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await getPackages();
      setPackages(data);
    };
    fetchPackages();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center my-6">
        Available Tour Packages
      </h1>
      <div className="flex flex-wrap justify-center">
        {packages.map(pkg => (
          <PackageCard key={pkg._id} {...pkg} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;