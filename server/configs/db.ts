// MongoDB connection. Called once at startup; the process exits via env.ts if the URI is missing.
import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDB(): Promise<void> {
	await mongoose.connect(env.MONGODB_URI);
	console.log(`MongoDB connected: ${mongoose.connection.name}`);
}
