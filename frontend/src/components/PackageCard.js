import React from 'react';
import { useNavigate } from 'react-router-dom';

const PackageCard = ({ _id, title, description, price, image }) => {
  const navigate = useNavigate();

  const handlePackageClick = (event) => {
    // Prevent any default behavior
    event.preventDefault();
    
    // Log for debugging
    console.log('Package clicked:', _id);
    
    // Navigate to package details
    navigate(`/packages/${_id}`);
  };

  return (
    <div 
      className="max-w-sm rounded overflow-hidden shadow-lg m-4 cursor-pointer" 
      onClick={handlePackageClick}
    >
      <img 
        className="w-full h-48 object-cover" 
        src={image} 
        alt={title} 
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="mt-4">
          <span className="text-green-600 font-semibold">
            Price: ${price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;