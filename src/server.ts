import express from 'express';
import payload from 'payload';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// CORS configuration to allow requests from Frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Initialize Payload
const start = async () => {
  try {
    // Initialize Payload CMS
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',
      express: app,
      onInit: async () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      },
    });

    // Add custom routes if needed
    app.get('/', (req, res) => {
      res.redirect('/admin');
    });

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok', message: 'Server is running' });
    });

    // Start Express server
    // Bind to 0.0.0.0 for Railway deployment
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Admin panel: /admin`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

start();
