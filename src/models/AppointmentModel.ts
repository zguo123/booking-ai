import { AppointmentItems } from "@/typings/appointments";
import { Model, Schema, model, models } from "mongoose";

export const appointmentSchema = new Schema<AppointmentItems>({
  user: {
    type: String,
    required: [true, "Please enter your user"],
  },
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter your phone number"],
  },
  appointmentDate: {
    type: Date,
    required: [true, "Please enter your appointment date"],
  },
  appointmentNotes: {
    type: String,
    required: false,
  },

  totalDuration: {
    type: Number,
    required: [true, "Please enter your total duration"],
  },

  services: {
    type: [String],
    required: [true, "Please enter your services"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Please enter your total price"],
  },
});

const AppointmentModel =
  (models.Appointment as Model<AppointmentItems>) ||
  model<AppointmentItems>("Appointment", appointmentSchema);

export default AppointmentModel;
