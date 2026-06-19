import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMusic extends Document {
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

const MusicSchema = new Schema<IMusic>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

if (mongoose.models.Music) {
  delete mongoose.models.Music;
}

export const Music: Model<IMusic> = mongoose.model<IMusic>('Music', MusicSchema);
