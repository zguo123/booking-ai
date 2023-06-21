/**
 * YAN HU HAIR
 *
 * User Modal
 *
 * @author Zhaoyu Guo
 */

import { Model, model, models, Schema } from "mongoose";
import { UserItemsWithoutId, IUserItems } from "@/typings/user";
import validator from "validator";

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
});

const UserModel =
  (models.User as Model<IUserItems>) || model<IUserItems>("User", userSchema);

export default UserModel;
