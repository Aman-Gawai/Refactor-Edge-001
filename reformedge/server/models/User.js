import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["viewer", "creator"], default: "viewer" },
    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    socialLinks: {
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      twitter: { type: String, default: "" }
    },
    preferences: {
      notifications: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false }
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    lastActive: { type: Date },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
