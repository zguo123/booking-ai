import { AppointmentItems } from "@/typings/appointments";
import { Model, Schema, model, models } from "mongoose";

export const appointmentSchema = new Schema<AppointmentItems>({
  name: {
    type: String,
    required: [true, "Please enter your name"],
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
