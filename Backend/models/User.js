import mongoose from 'mongoose';

// 🔹 Reusable Address Schema
const AddressSchema = new mongoose.Schema({
  street: { type: String, required: [true, "Street is required"] },
  city: { type: String, required: [true, "City is required"] },
  state: { type: String },
  zip: { type: String }
}, { _id: false });

// 🔹 Main User Schema
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
    trim: true,
    minlength: 3
  },

  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^\d{10}$/, "Phone number must be 10 digits"]
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6
  },

  address: {
    type: AddressSchema,
    required: [true, "Address is required"]
  },

  accountType: {
    type: String,
    required: true,
    enum: ['employee', 'student', 'individual']
  },

  // 🔸 EMPLOYEE-SPECIFIC FIELDS
  companyDetails: {
    companyName: { type: String },
    companyWebsite: { type: String },
    portfolioURL: { type: String },
    companyAddress: { type: AddressSchema }
  },

  // 🔸 STUDENT-SPECIFIC FIELDS
  studentDetails: {
    instituteName: { type: String },
    stream: { type: String }
  },

  // 🔸 INDIVIDUAL-SPECIFIC FIELDS
  individualDetails: {
    purpose: { type: String },
    workType: {
      type: String,
      enum: ['freelancing', 'personal_project']
    }
  },

  // 🧑‍💻 Account Status for Admin Control
  isSuspended: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

// 🔍 Middleware for Conditional Validation
UserSchema.pre('validate', function (next) {
  const user = this;

  if (user.accountType === 'employee') {
    const d = user.companyDetails;
    if (!d || !d.companyName || !d.companyWebsite || !d.companyAddress || !d.companyAddress.street || !d.companyAddress.city) {
      return next(new Error("Missing required fields for 'employee' account."));
    }
  }

  if (user.accountType === 'student') {
    const d = user.studentDetails;
    if (!d || !d.instituteName || !d.stream) {
      return next(new Error("Missing required fields for 'student' account."));
    }
  }

  if (user.accountType === 'individual') {
    const d = user.individualDetails;
    if (!d || !d.purpose || !d.workType) {
      return next(new Error("Missing required fields for 'individual' account."));
    }
  }

  next();
});

// ✅ Export
export default mongoose.model("User", UserSchema);