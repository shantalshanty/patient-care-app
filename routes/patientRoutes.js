const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const { getPatients } = require('../controllers/patientController');

router.get('/patients', protect, authorize('doctor'), getPatients);

module.exports = router;