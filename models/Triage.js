const mongoose = require('mongoose');

const triageSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mainSymptom: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    painLevel: {
        type: Number,
        required: true
    },
    breathingDifficulty: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    fever: {
        type: String,
        enum: ['yes', 'no'],
        required: true
    },
    urgency: {
        type: String,
        default: 'Low'
    },
    summary: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Triage', triageSchema);