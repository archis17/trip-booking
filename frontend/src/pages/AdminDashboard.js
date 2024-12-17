import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: '',
    image: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch packages and bookings
  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        // Fetch existing packages
        const packagesResponse = await axios.get('http://localhost:5000/api/admin/packages', {
          headers: {
            username: 'admin',  // Direct username
            password: 'adminpassword'  // Direct password
          }
        });
    
        // Fetch existing bookings
        const bookingsResponse = await axios.get('http://localhost:5000/api/admin/bookings', {
          headers: {
            username: 'admin',  // Direct username
            password: 'adminpassword'  // Direct password
          }
        });
    
        setPackages(packagesResponse.data);
        setBookings(bookingsResponse.data);
      } catch (err) {
        console.error('Error fetching admin data:', err.response ? err.response.data : err.message);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    

    fetchAdminData();
  }, []);

  // Handle package creation
  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setError(null);

    const availableDates = newPackage.availableDates.split(',').map(date => date.trim());

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/packages',
        {
          ...newPackage,  // Spread the newPackage object
          availableDates, // Convert available dates into an array
        },
        {
          headers: {
            username: 'admin',  // Direct username
            password: 'adminpassword'  // Direct password
          }
        }
      );

      setPackages([...packages, response.data]);  // Add the new package to the state
      setNewPackage({ title: '', description: '', price: '', availableDates: '', image: '' });  // Reset form
    } catch (err) {
      console.error('Error creating package:', err);
      setError('Failed to create package. Please check your inputs.');
    }
  };

  // Handle package deletion
  const handleDeletePackage = async (packageId) => {
    setError(null);
    try {
      await axios.delete(`http://localhost:5000/api/admin/packages/${packageId}`, {
        headers: {
          username: 'admin',  // Direct username
          password: 'adminpassword'  // Direct password
        }
      });

      setPackages(packages.filter(pkg => pkg._id !== packageId));
    } catch (err) {
      console.error('Error deleting package:', err);
      setError('Failed to delete package. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-gray-500">Loading data...</div>
      ) : (
        <>
          {/* Create New Package Form */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Add New Package</h2>
            <form onSubmit={handleCreatePackage} className="space-y-4">
              <input
                type="text"
                placeholder="Package Title"
                value={newPackage.title}
                onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                placeholder="Description"
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Available Dates (comma-separated)"
                value={newPackage.availableDates}
                onChange={(e) => setNewPackage({ ...newPackage, availableDates: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newPackage.image}
                onChange={(e) => setNewPackage({ ...newPackage, image: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Create Package
              </button>
            </form>
          </div>

          {/* Packages List */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Existing Packages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packages.map(pkg => (
                <div key={pkg._id} className="border p-4 rounded">
                  <h3 className="font-bold">{pkg.title}</h3>
                  <p>Price: ${pkg.price}</p>
                  <p>Available Dates: {pkg.availableDates.join(', ')}</p>
                  <button
                    onClick={() => handleDeletePackage(pkg._id)}
                    className="bg-red-500 text-white p-2 rounded mt-2 hover:bg-red-600"
                  >
                    Delete Package
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Customer Name</th>
                  <th className="border p-2">Package</th>
                  <th className="border p-2">Travelers</th>
                  <th className="border p-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id} className="text-center">
                    <td className="border p-2">{booking.name}</td>
                    <td className="border p-2">{booking.package.title}</td>
                    <td className="border p-2">{booking.travelers}</td>
                    <td className="border p-2">${booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
