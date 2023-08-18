import {model, Schema} from "mongoose";

export const User = model("User", new Schema({
  login: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true,
  }
}));

