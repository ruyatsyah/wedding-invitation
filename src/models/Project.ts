import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  clientName: string;
  coupleName: string;
  customUrl: string;
  themeId: mongoose.Types.ObjectId;
  status: 'pending' | 'active' | 'expired';
  priceSnapshot: number;
  // Content fields
  groomFullName: string;
  groomParents: string;
  groomInstagram: string;
  groomPhoto: string;
  brideFullName: string;
  brideParents: string;
  brideInstagram: string;
  bridePhoto: string;
  gallery: string[];
  eventDate: string;
  eventTime: string;
  eventTimezone: string;
  venue: string;
  mapsUrl: string;
  youtubeUrl: string;
  enableRsvp: boolean;
  enableGuestbook: boolean;
  bankName: string;
  bankAccount: string;
  bankHolder: string;
  bgMusic: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    clientName: { type: String, default: 'Client' },
    coupleName: { type: String, required: true },
    customUrl: { type: String, required: true, unique: true, trim: true },
    themeId: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
    status: { type: String, enum: ['pending', 'active', 'expired'], default: 'active' },
    priceSnapshot: { type: Number, required: true },
    // Content
    groomFullName: { type: String, default: '' },
    groomParents: { type: String, default: '' },
    groomInstagram: { type: String, default: '' },
    groomPhoto: { type: String, default: '' },
    brideFullName: { type: String, default: '' },
    brideParents: { type: String, default: '' },
    brideInstagram: { type: String, default: '' },
    bridePhoto: { type: String, default: '' },
    gallery: { type: [String], default: [] },
    eventDate: { type: String, default: '' },
    eventTime: { type: String, default: '' },
    eventTimezone: { type: String, default: 'WIB (GMT+7)' },
    venue: { type: String, default: '' },
    mapsUrl: { type: String, default: '' },
    youtubeUrl: { type: String, default: '' },
    enableRsvp: { type: Boolean, default: true },
    enableGuestbook: { type: Boolean, default: true },
    bankName: { type: String, default: '' },
    bankAccount: { type: String, default: '' },
    bankHolder: { type: String, default: '' },
    bgMusic: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
