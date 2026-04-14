const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    showTriageForm,
    submitTriage,
    getPatientTriageHistory,
    getAllTriageRecords
} = require('../controllers/triageController');

// Patient routes
router.get('/triage', protect, authorize('patient'), showTriageForm);
router.post('/triage', protect, authorize('patient'), submitTriage);
router.get('/triage-history', protect, authorize('patient'), getPatientTriageHistory);

// Doctor route
router.get('/doctor-triage', protect, authorize('doctor'), getAllTriageRecords);

module.exports = router;