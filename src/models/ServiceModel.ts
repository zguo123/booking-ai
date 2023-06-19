import { ServiceItems } from "@/typings/service";
import { Model, Schema, model, models } from "mongoose";

const serviceSchema = new Schema<ServiceItems>({
  name: {
    type: String,
    required: [true, "Service name is required"],
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  price: {
    type: Number,
    required: [true, "Service price is required"],
  },
  duration: {
    type: Number,
    required: [true, "Service duration is required"],
  },
  user: {
    type: String,
    required: [true, "User is required"],
  },
});

const ServiceModel =
  (models.Services as Model<ServiceItems>) ||
  model<ServiceItems>("Services", serviceSchema);

export default ServiceModel;
