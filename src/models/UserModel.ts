/**
 * YAN HU HAIR
 *
 * User Modal
 *
 * @author Zhaoyu Guo
 */

import { Integration } from "@/typings/integrations";
import { IUserItems } from "@/typings/user";
import { Model, model, models, Schema } from "mongoose";
import validator from "validator";

const integrationSchema = new Schema<Integration>({
  integrationName: {
    type: String,
    required: [true, "Integration Name is required"],
  },

  code: {
    type: String,
    required: [true, "Code is required"],
  },
});

const userSchema = new Schema<IUserItems>({
  firstName: {
    type: String,
    validate: {
      validator: (v: string) => validator.isAlpha(v, "en-US", { ignore: " " }),
      message: `First Name must be only letters`,
    },
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    validate: {
      validator: (v: string) => validator.isAlpha(v, "en-US", { ignore: " " }),
      message: `Last Name must be only letters`,
    },
    required: [true, "Last  Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: `Email is not valid`,
    },
  },

  username: {
    type: String,
    unique: true,

    required: [true, "Username is required"],
    validate: {
      validator: (v: string) =>
        validator.isAlphanumeric(v, "en-US", { ignore: " " }),
      message: `Username must be only letters and numbers`,
    },
  },

  lastLogin: {
    type: Date,
    default: new Date(),
    required: [true, "Last login is required"],
  },

  integrations: {
    type: [integrationSchema],
    default: [],
    required: false,
  },
});

const UserModel =
  (models.User as Model<IUserItems>) || model<IUserItems>("User", userSchema);

export default UserModel;
