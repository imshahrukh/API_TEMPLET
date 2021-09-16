import { Schema, model } from "mongoose";

const Member = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

export default model("Member", Member);
