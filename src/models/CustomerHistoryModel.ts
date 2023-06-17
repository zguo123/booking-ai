/**
 * YAN HU HAIR
 *
 * Customer History Model
 *
 * @author Zhaoyu Guo
 */

import { CustomerHistoryWithoutId, ICustomerHistory } from "@/typings/customer";
import { Model, model, models, Schema } from "mongoose";
import CustomerModel from "./CustomerModel";

const customerHistorySchema = new Schema<ICustomerHistory>({
  customer: {
    type: Schema.Types.ObjectId,
    ref: CustomerModel,
    required: [true, "Customer is required"],
  },
  dateVisited: {
    type: String,
    default: new Date().toISOString(),

    required: [true, "Date is required"],
  },
  sessionDuration: {
    type: Number,
    default: 0,
    required: [true, "Duration is required"],
  },
});

customerHistorySchema.plugin(require("mongoose-autopopulate"));

const CustomerHistoryModel =
  (models.CustomerHistory as Model<CustomerHistoryWithoutId>) ||
  model<CustomerHistoryWithoutId>("CustomerHistory", customerHistorySchema);

export default CustomerHistoryModel;
