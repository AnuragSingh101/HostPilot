// models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  availableFor: {
    type: [String], // e.g., ['student', 'employee']
    default: ['student', 'employee', 'admin'],
  },
});

export default mongoose.model('Service', serviceSchema);
