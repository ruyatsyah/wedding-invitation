import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  name: string;
  tagline: string;
  price: string;
  originalPrice: string;
  period: string;
  popular: boolean;
  features: string[];
  cta: string;
  sortOrder: number;
}

const PackageSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    price: { type: String, required: true },
    originalPrice: { type: String, default: '' },
    period: { type: String, required: true },
    popular: { type: Boolean, default: false },
    features: { type: [String], required: true },
    cta: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

if (mongoose.models.Package) {
  delete mongoose.models.Package;
}

export default mongoose.model<IPackage>('Package', PackageSchema);
