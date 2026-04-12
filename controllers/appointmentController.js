const Appointment = require('../models/Appointment');

// Book appointment
exports.bookAppointment = async (req, res) => {
    try {
        const { date } = req.body;

        const appointment = new Appointment({
            patientId: req.user.id,
            date
        });

        await appointment.save();
        res.redirect('/appointments');
    } catch (err) {
        console.error(err);
        res.send('Error booking appointment');
    }
};

// View appointments with search, filter, and pagination
exports.getAppointments = async (req, res) => {
    try {
        let filter = {};

        if (req.user.role === 'patient') {
            filter.patientId = req.user.id;
        }

        if (req.query.status && req.query.status !== 'All') {
            filter.status = req.query.status;
        }

        if (req.query.date) {
            filter.date = req.query.date;
        }

        let appointments = await Appointment.find(filter)
            .populate('patientId', 'name email')
            .sort({ _id: -1 });

        if (req.query.search) {
            appointments = appointments.filter(app =>
                app.patientId.name.toLowerCase().includes(req.query.search.toLowerCase())
            );
        }

        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const totalRecords = appointments.length;
        const totalPages = Math.max(1, Math.ceil(totalRecords / limit));

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedAppointments = appointments.slice(startIndex, endIndex);

        res.render('appointments', {
            appointments: paginatedAppointments,
            user: req.user,
            filters: req.query || {},
            currentPage: page,
            totalPages
        });
    } catch (err) {
        console.error(err);
        res.send('Error fetching appointments');
    }
};

// Update status (Doctor only)
exports.updateStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        await Appointment.findByIdAndUpdate(id, { status });

        res.redirect('/appointments');
    } catch (err) {
        console.error(err);
        res.send('Error updating appointment');
    }
};