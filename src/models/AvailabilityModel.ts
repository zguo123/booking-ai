import { AvailabilityItems, WorkingHours } from "@/typings/availability";
import { Model, Schema, model, models } from "mongoose";

export const WorkingHoursSchema = new Schema<WorkingHours>({
  from: {
    type: String,
    required: false,
  },
  to: {
    type: String,
    required: false,
  },
  isClosed: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const availabilitySchema = new Schema<AvailabilityItems>({
  monday: WorkingHoursSchema,
  tuesday: WorkingHoursSchema,
  wednesday: WorkingHoursSchema,
  thursday: WorkingHoursSchema,
  friday: WorkingHoursSchema,
  saturday: WorkingHoursSchema,
  sunday: WorkingHoursSchema,
  includeHolidays: {
    type: Boolean,
    required: false,
    default: false,
  },
  user: {
    type: String,
    required: [true, "User is required"],
  },
  monthYear: {
    type: String,
    required: [true, "Month is required"],
    unique: true,
  },
});

const AvailabilityModel =
  (models.Availability as Model<AvailabilityItems>) ||
  model<AvailabilityItems>("Availability", availabilitySchema);

export default AvailabilityModel;
