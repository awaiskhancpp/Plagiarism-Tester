// models/apikey.model.js
import mongoose from "mongoose";

const ApiKeySchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    requests: {
      type: Number,
      default: 0,
    },
    lastUsed: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ApiKey || mongoose.model("ApiKey", ApiKeySchema);