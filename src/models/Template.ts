import mongoose, { Schema, Document } from 'mongoose';

export interface ITemplate extends Document {
  templateName: string;
  price: number;
  discount: number;
  sourceCodeUrl: string;
  thumbnailUrl: string;
  enableWaBlast: boolean;
  guestListOnly: boolean;
  dailyLimit: number;
  publishImmediately: boolean;
  showOnLanding: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TemplateSchema: Schema = new Schema(
  {
    templateName: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, default: 0 },
    sourceCodeUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true },
    enableWaBlast: { type: Boolean, default: false },
    guestListOnly: { type: Boolean, default: false },
    dailyLimit: { type: Number, default: 100 },
    publishImmediately: { type: Boolean, default: true },
    showOnLanding: { type: Boolean, default: true },
  },
  { timestamps: true }
);

if (mongoose.models.Template) {
  delete mongoose.models.Template;
}
export default mongoose.model<ITemplate>('Template', TemplateSchema);
