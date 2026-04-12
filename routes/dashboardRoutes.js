const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');

router.get('/dashboard', protect, async (req, res) => {
    try {

        let filter = {};

        // If patient, show only their appointments
        if (req.user.role === 'patient') {
            filter = { patientId: req.user.id };
        }

        const totalAppointments = await Appointment.countDocuments(filter);
        const pendingAppointments = await Appointment.countDocuments({ ...filter, status: 'Pending' });
        const approvedAppointments = await Appointment.countDocuments({ ...filter, status: 'Approved' });
        const rejectedAppointments = await Appointment.countDocuments({ ...filter, status: 'Rejected' });

        const recentAppointments = await Appointment.find(filter)
            .populate('patientId', 'name email')
            .sort({ _id: -1 })
            .limit(5);

        res.render('dashboard', {
            user: req.user,
            stats: {
                totalAppointments,
                pendingAppointments,
                approvedAppointments,
                rejectedAppointments
            },
            recentAppointments
        });

    } catch (err) {
        console.error(err);
        res.send('Dashboard error');
    }
});

router.get('/doctor', protect, authorize('doctor'), async (req, res) => {
    try {

        const totalAppointments = await Appointment.countDocuments();
        const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });
        const approvedAppointments = await Appointment.countDocuments({ status: 'Approved' });
        const rejectedAppointments = await Appointment.countDocuments({ status: 'Rejected' });

        const recentAppointments = await Appointment.find()
            .populate('patientId', 'name email')
            .sort({ _id: -1 })
            .limit(5);

        res.render('doctor', {
            user: req.user,
            stats: {
                totalAppointments,
                pendingAppointments,
                approvedAppointments,
                rejectedAppointments
            },
            recentAppointments
        });

    } catch (err) {
        console.error(err);
        res.send('Doctor dashboard error');
    }
});

module.exports = router;