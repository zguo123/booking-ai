/**
 * YAN HU HAIR
 *
 * Check In Queue Model
 *
 * @author Zhaoyu Guo
 */

import {
  CheckInQueueItemsWithoutId,
  ICheckInQueueItems,
} from "@/typings/checkIn";
import { Model, model, models, Schema } from "mongoose";
import CustomerModel from "./CustomerModel";

const checkInQueueSchema = new Schema<ICheckInQueueItems>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: CustomerModel,
    autopopulate: true,
    required: [true, "Customer is required"],
  },
  checkInDate: {
    type: Date,
    default: new Date(),
    required: [true, "Date is required"],
  },
  checkOutDate: {
    type: Date,
    default: new Date(),
    required: [true, "Date is required"],
  },
  duration: {
    type: Number,
    default: 0,
    required: [true, "Duration is required"],
  },
  isAccepted: {
    type: Boolean,
    default: false,
    required: [true, "Is accepted is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
    required: [true, "Is completed is required"],
  },
});

checkInQueueSchema.plugin(require("mongoose-autopopulate"));

const CheckInQueueModel =
  (models.CheckInQueue as Model<CheckInQueueItemsWithoutId>) ||
  model<CheckInQueueItemsWithoutId>("CheckInQueue", checkInQueueSchema);

export default CheckInQueueModel;
