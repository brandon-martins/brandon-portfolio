// A stored contact submission. `fields` holds the enquiry-specific answers (role/company or scope/budget).
// `status` lets the inbox be triaged later; there is no `updatedAt` because messages are write-once.
import mongoose, { Schema } from 'mongoose';

const contactMessageSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		type: { type: String, enum: ['job', 'project', 'other'], required: true },
		fields: { type: Schema.Types.Mixed, default: {} },
		message: { type: String, required: true },
		ipHash: { type: String, required: true },
		status: {
			type: String,
			enum: ['new', 'read', 'replied', 'archived'],
			default: 'new',
		},
	},
	{ timestamps: { createdAt: true, updatedAt: false } },
);

export default mongoose.model('ContactMessage', contactMessageSchema);
