import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Admin username is required"],
    unique: true,
    minlength: 3,
    trim: true
  },

  email: {
    type: String,
    required: [true, "Admin email is required"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"]
  },

  password: {
    type: String,
    required: [true, "Admin password is required"],
    minlength: 6
  },

  role: {
    type: String,
    enum: ['superadmin', 'moderator'],
    default: 'moderator'
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

export default mongoose.model("Admin", AdminSchema);
