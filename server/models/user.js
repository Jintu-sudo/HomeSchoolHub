const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    location: { type: String, default: "", trim: true },
    gradeLevel: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    bio: { type: String, default: "", trim: true },
    website: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
