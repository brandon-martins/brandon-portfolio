// Order matters: rate limit first (cheap), then validate, then the controller.
// The schema comes from @portfolio/shared, so it is the exact one the browser form already validated against.
import express from 'express';
import { createContact } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '@portfolio/shared';

const contactRouter = express.Router();
contactRouter.post('/', contactLimiter, validate(contactSchema), createContact);
export default contactRouter;
