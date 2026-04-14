const Triage = require('../models/Triage');

// Show triage form
exports.showTriageForm = async (req, res) => {
    try {
        res.render('triage', { user: req.user });
    } catch (err) {
        console.error(err);
        res.send('Error loading triage form');
    }
};

// Submit triage
exports.submitTriage = async (req, res) => {
    try {
        const { mainSymptom, duration, painLevel, breathingDifficulty, fever } = req.body;

        let urgency = 'Low';

        if (breathingDifficulty === 'yes' || Number(painLevel) >= 8) {
            urgency = 'High';
        } else if (fever === 'yes' || Number(painLevel) >= 5) {
            urgency = 'Medium';
        }

        const summary = `Patient reports ${mainSymptom} for ${duration}. Pain level is ${painLevel}/10. Breathing difficulty: ${breathingDifficulty}. Fever: ${fever}. Triage urgency: ${urgency}.`;

        const triage = new Triage({
            patientId: req.user.id,
            mainSymptom,
            duration,
            painLevel,
            breathingDifficulty,
            fever,
            urgency,
            summary
        });

        await triage.save();

        res.redirect('/triage-history');
    } catch (err) {
        console.error(err);
        res.send('Error submitting triage');
    }
};

// Patient triage history
exports.getPatientTriageHistory = async (req, res) => {
    try {
        const triageRecords = await Triage.find({ patientId: req.user.id }).sort({ createdAt: -1 });

        res.render('triage-history', {
            user: req.user,
            triageRecords
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading triage history');
    }
};

// Doctor sees all triage records
exports.getAllTriageRecords = async (req, res) => {
    try {
        const triageRecords = await Triage.find()
            .populate('patientId', 'name email')
            .sort({ createdAt: -1 });

        res.render('doctor-triage', {
            user: req.user,
            triageRecords
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading doctor triage records');
    }
};