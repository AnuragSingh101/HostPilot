// models/ServiceUsage.js
import mongoose from 'mongoose';

const serviceUsageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  usedAt: { type: Date, default: Date.now },
  meta: {
    ip: String,
    os: String,
    browser: String,
    // any extra detail about usage
  },
});

export default mongoose.model('ServiceUsage', serviceUsageSchema);
