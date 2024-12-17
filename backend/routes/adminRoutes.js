const express = require('express');
const router = express.Router();
const { 
  getAllPackages,
  addPackage, 
  updatePackage, 
  deletePackage, 
  getAllBookings 
} = require('../controllers/adminController');
const { adminAuth } = require('../middleware/authMiddleware');

router.use(adminAuth)

router.get('/packages', adminAuth, getAllPackages)
router.post('/packages', adminAuth, addPackage);
router.put('/packages/:id', adminAuth, updatePackage);
router.delete('/packages/:id', adminAuth, deletePackage);
router.get('/bookings', adminAuth, getAllBookings);

module.exports = router;