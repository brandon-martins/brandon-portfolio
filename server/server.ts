// Process entry point: connect to MongoDB, then start listening. Everything testable lives in app.ts.
import { createApp } from './app.js';
import { connectDB } from './configs/db.js';
import { env } from './configs/env.js';

await connectDB();
createApp().listen(env.PORT, () => console.log(`API listening on :${env.PORT}`));
