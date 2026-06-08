import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  clientName: string;
  coupleName: string;
  customUrl: string;
  themeId?: mongoose.Types.ObjectId;
  plan?: string;
  status: 'pending' | 'active' | 'expired' | 'inactive';
  activatedAt?: Date;
  expiresAt?: Date;
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
  digitalEnvelopes: { bankName: string; bankAccount: string; bankHolder: string }[];
  bgMusic: string;
  quoteText: string;
  quoteSource: string;
  igStoryUrl: string;
  guests: { name: string; noWa: string; isSent?: boolean }[];
  loveStories: { date: string; title: string; story: string }[];
  plannerTasks: { id: string; title: string; category: string; isCompleted: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    clientName: { type: String, default: 'Client' },
    coupleName: { type: String, required: true },
    customUrl: { type: String, required: true, unique: true, trim: true },
    themeId: { type: Schema.Types.ObjectId, ref: 'Template', required: false },
    plan: { type: String, default: 'bronze' },
    status: { type: String, enum: ['pending', 'active', 'expired', 'inactive'], default: 'active' },
    activatedAt: { type: Date, default: null },
    expiresAt:   { type: Date, default: null },
    priceSnapshot: { type: Number, required: true, default: 0 },
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
    digitalEnvelopes: [{
      bankName: { type: String },
      bankAccount: { type: String },
      bankHolder: { type: String }
    }],
    bgMusic: { type: String, default: '' },
    quoteText: { type: String, default: '' },
    quoteSource: { type: String, default: '' },
    igStoryUrl: { type: String, default: '' },
    guests: [{
      name: { type: String },
      noWa: { type: String },
      isSent: { type: Boolean, default: false },
    }],
    loveStories: [{
      date: { type: String },
      title: { type: String },
      story: { type: String }
    }],
    plannerTasks: [{
      id: { type: String },
      title: { type: String },
      category: { type: String },
      isCompleted: { type: Boolean, default: false }
    }],
  },
  { timestamps: true }
);

if (mongoose.models.Project) {
  delete mongoose.models.Project;
}

export const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);
