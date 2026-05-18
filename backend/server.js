import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import employeeRoutes from './src/routes/employeeRoutes.js';
import aiRoutes from './src/routes/aiRoutes.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
// Configure CORS to support one or more allowed client URLs provided
// via the CLIENT_URL env var (comma-separated). If CLIENT_URL is "*"
// the server will allow any origin. When credentials are enabled,
// you must return a specific origin value instead of '*'.
const rawClientUrl = process.env.CLIENT_URL || '';
const allowedOrigins = rawClientUrl === '*' ? ['*'] : rawClientUrl.split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({
	origin: (origin, callback) => {
		// Allow requests with no origin (like mobile apps, curl, or server-to-server)
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true);
		// Do not throw an error here; return false so the CORS middleware
		// simply doesn't set CORS headers for disallowed origins.
		console.warn(`CORS: rejected origin=${origin} allowed=${allowedOrigins.join(',')}`);
		return callback(null, false);
	},
	credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ message: 'Employee AI Performance API running' }));
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/ai', aiRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
