// scripts/seedDatabase.js
require('dotenv').config();
const mongoose = require('mongoose');
const Package = require('./models/Package')
const Booking = require('./models/Booking')



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Sample Packages
const samplePackages = [
  {
    title: "Tropical Paradise Getaway",
    description: "A week-long adventure in the beautiful beaches of Bali, Indonesia. Includes accommodation, meals, and guided tours.",
    price: 1500,
    availableDates: [
      new Date('2024-07-15'),
      new Date('2024-08-20'),
      new Date('2024-09-10')
    ],
    image: "https://example.com/bali-package.jpg"
  },
  {
    title: "European Expedition",
    description: "Explore the historic cities of Paris, Rome, and Barcelona. Includes transportation, walking tours, and select meals.",
    price: 2500,
    availableDates: [
      new Date('2024-06-01'),
      new Date('2024-07-10'),
      new Date('2024-08-15')
    ],
    image: "https://example.com/europe-package.jpg"
  }
];

// Seed Function
const seedDatabase = async () => {
  try {
    // Clear existing packages
    await Package.deleteMany({});
    
    // Insert sample packages
    const insertedPackages = await Package.insertMany(samplePackages);
    console.log('Packages seeded successfully');

    // Optional: Create a sample booking
    const sampleBooking = new Booking({
      package: insertedPackages[0]._id,
      customerName: "John Doe",
      email: "johndoe@example.com",
      phoneNumber: "+1234567890",
      numberOfTravelers: 2,
      specialRequests: "Honeymoon couple, need special room arrangement",
      totalPrice: insertedPackages[0].price * 2
    });

    await sampleBooking.save();
    console.log('Sample booking created');

    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  }
};

seedDatabase();