/**
 * YAN HU HAIR
 *
 * Customer Model
 *
 * @author Zhaoyu Guo
 */

import { Model, model, models, Schema } from "mongoose";

import { CustomerItemsWithoutId, ICustomerItems } from "@/typings/customer";
import validator from "validator";

const customerSchema = new Schema<ICustomerItems>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: false,
    validate: {
      validator: (v: string) => {
        return v?.trim() === "" ? true : validator.isEmail(v);
      },
      message: `Email is not valid`,
    },
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Phone is required"],
    validate: {
      validator: (v: string) => validator.isMobilePhone(v, "en-CA"),
      message: `Phone number is not valid`,
    },
  },
  lastVisited: {
    type: String,
    default: new Date().toISOString(),
    required: [true, "Last visited is required"],
  },
});

const CustomerModel =
  (models.Customer as Model<CustomerItemsWithoutId>) ||
  model<CustomerItemsWithoutId>("Customer", customerSchema);

export default CustomerModel;
