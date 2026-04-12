const express = require('express');
const router = express.Router();
const {
    bookAppointment,
    getAppointments,
    updateStatus
} = require('../controllers/appointmentController');

const { protect, authorize } = require('../middleware/authMiddleware');

// Patient books appointment
router.post('/appointments/book', protect, bookAppointment);

// Both roles can view appointments
router.get('/appointments', protect, getAppointments);

// Only doctor can update status
router.post('/appointments/update', protect, authorize('doctor'), updateStatus);

module.exports = router;