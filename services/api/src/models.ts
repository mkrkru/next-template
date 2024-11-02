import { Types } from "mongoose";
import { getModelForClass, prop } from "@typegoose/typegoose";

class IUser {
  @prop() public _id!: Types.ObjectId;

  @prop() public nickname!: string;
  @prop() public password_hash!: string;
}

export const User = getModelForClass(IUser);
