const Booking = require('../models/Booking');
const Package = require('../models/Package');

exports.createBooking = async (req, res) => {
  try {
    const { packageId, name, email, phone, travelers, specialRequests } = req.body;
    
    // Validate package exists
    const package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Calculate total price
    const totalPrice = package.price * travelers;

    // Create booking
    const newBooking = new Booking({
      package: packageId,
      name,
      email,
      phone,
      travelers,
      specialRequests,
      totalPrice
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
};
