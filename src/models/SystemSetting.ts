import mongoose, { Document, Schema } from 'mongoose';

export interface ISystemSetting extends Document {
  invitationActivePeriod: string; // e.g. '1 Year Auto-lock', '6 Months Auto-lock', 'Never Expire'
  maintenanceMode: boolean;
  updatedAt: Date;
}

const SystemSettingSchema = new Schema<ISystemSetting>({
  invitationActivePeriod: {
    type: String,
    default: '1 Year Auto-lock',
  },
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Since there should only be one settings document, we can enforce it if needed,
// but for simplicity, we'll just always fetch/update the first document we find.

export const SystemSetting = mongoose.models.SystemSetting || mongoose.model<ISystemSetting>('SystemSetting', SystemSettingSchema);
