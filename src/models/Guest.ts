import mongoose, { Schema, Document } from 'mongoose';

export interface IGuest extends Document {
  name: string;
  slug: string;
  phone?: string;
  rsvpStatus: 'PENDING' | 'ATTENDING' | 'DECLINED';
  pax: number;
  group?: string;
  isOpened: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GuestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    phone: { type: String },
    rsvpStatus: {
      type: String,
      enum: ['PENDING', 'ATTENDING', 'DECLINED'],
      default: 'PENDING',
    },
    pax: { type: Number, default: 0 },
    group: { type: String, default: 'Reguler' },
    isOpened: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);
