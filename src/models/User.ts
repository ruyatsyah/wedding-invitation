import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "admin" | "client";
  image?: string;
  emailVerified?: Date;
  provider?: "credentials" | "google" | "hybrid";
  banned?: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String },
    image: { type: String },
    emailVerified: { type: Date },
    provider: {
      type: String,
      enum: ["credentials", "google", "hybrid"],
      default: "credentials",
    },
    role: { type: String, enum: ["admin", "client"], default: "client" },
    banned: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true },
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
