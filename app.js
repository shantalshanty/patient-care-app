require('dotenv').config();   // ✅ LOAD ENV FIRST

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cookieParser = require('cookie-parser');

connectDB();                  // ✅ now env is available

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const triageRoutes = require('./routes/triageRoutes');

app.use('/', appointmentRoutes);
app.use('/', dashboardRoutes);
app.use('/', authRoutes);
app.use('/', patientRoutes);
app.use('/', triageRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Patient Care System' });
});

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});