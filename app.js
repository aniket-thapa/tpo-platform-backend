const express = require('express');
const cors = require('cors');
const rateLimiter = require('./middlewares/rateLimiter');
const helmet = require('helmet');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(helmet());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/placements', require('./routes/placementRoutes'));
app.use('/api/interviews', require('./routes/interviewRoutes'));
app.use('/api/selections', require('./routes/finalSelectionRoutes'));

app.get('/', (req, res) => {
  res.send('TPO Platform API Running');
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
  });
});

module.exports = app;
