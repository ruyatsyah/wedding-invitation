import mongoose, { Schema, Document } from 'mongoose';

export interface IWish extends Document {
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  createdAt: Date;
  updatedAt: Date;
}

const WishSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    attendance: {
      type: String,
      enum: ['Hadir', 'Tidak Hadir', 'Masih Ragu'],
      default: 'Hadir',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Wish || mongoose.model<IWish>('Wish', WishSchema);
