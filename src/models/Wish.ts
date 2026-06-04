import mongoose, { Schema, Document } from 'mongoose';

export interface IWish extends Document {
  projectId: mongoose.Types.ObjectId;
  name: string;
  message: string;
  attendance: 'Hadir' | 'Tidak Hadir' | 'Masih Ragu';
  createdAt: Date;
  updatedAt: Date;
}

const WishSchema: Schema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
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

delete mongoose.models.Wish;
export default mongoose.models.Wish || mongoose.model<IWish>('Wish', WishSchema);
