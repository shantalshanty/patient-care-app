const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: String,
    status: {
        type: String,
        default: 'Pending' // Pending, Approved, Rejected
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);