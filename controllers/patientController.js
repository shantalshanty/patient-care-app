const User = require('../models/User');
const Appointment = require('../models/Appointment');

exports.getPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: 'patient' }).sort({ name: 1 });

        const patientsWithStats = await Promise.all(
            patients.map(async (patient) => {
                const appointmentCount = await Appointment.countDocuments({
                    patientId: patient._id
                });

                return {
                    _id: patient._id,
                    name: patient.name,
                    email: patient.email,
                    role: patient.role,
                    appointmentCount
                };
            })
        );

        res.render('patients', {
            user: req.user,
            patients: patientsWithStats
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading patient records');
    }
};