import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const PackageDetails = () => {
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        // Ensure you have the correct backend URL
        const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPackageDetails(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching package details', err);
        setError('Package not found');
        setLoading(false);
        // Redirect to home page if package not found
        navigate('/');
      }
    };

    fetchPackageDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Package Image */}
        <div>
          <img 
            src={packageDetails.image} 
            alt={packageDetails.title} 
            className="w-full rounded-lg shadow-lg object-cover h-96"
          />
        </div>

        {/* Package Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{packageDetails.title}</h1>
          <p className="text-gray-700 mb-6">{packageDetails.description}</p>

          <div className="mb-4">
            <span className="font-semibold text-lg">Price:</span> 
            <span className="text-green-600 ml-2">
              ${packageDetails.price} per person
            </span>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-xl mb-2">Available Dates:</h2>
            <ul className="list-disc list-inside">
              {packageDetails.availableDates.map((date, index) => (
                <li key={index}>
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric'
                  })}
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Form */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Book This Package</h2>
            <BookingForm 
              packageId={packageDetails._id} 
              price={packageDetails.price} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;