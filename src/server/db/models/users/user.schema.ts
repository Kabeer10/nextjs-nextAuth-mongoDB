import mongoose, { type InferSchemaType, Schema } from "mongoose";

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerified: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

type IUser = InferSchemaType<typeof userSchema>;

type IUserModel = mongoose.Model<IUser>;

const User =
  (mongoose.models.User as IUserModel) ??
  mongoose.model<IUser>("User", userSchema);

export { type IUser, User };
