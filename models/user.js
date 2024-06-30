import { hash } from "bcrypt";
import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("Password not modified, skipping hash.");
    return next();
  }
  try {
    console.log("Hashing password...");
    this.password = await hash(this.password, 10);
    console.log("Password hashed successfully.");
    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    next(err);
  }
});

export const User = mongoose.models.User || model("User", schema);
