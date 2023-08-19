import { Schema, model } from "mongoose";

export const Card = model(
  "Card",
  new Schema({
    titulo: {
      type: String,
      required: true,
    },
    conteudo: {
      type: String,
      required: true,
    },
    lista: {
      type: String,
      required: true,
      enum: ["TO_DO", "DOING", "DONE"],
      default: "TO_DO",
    },
  }),
);
