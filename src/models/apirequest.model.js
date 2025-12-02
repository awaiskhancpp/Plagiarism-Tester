import mongoose from "mongoose";

const ApiRequestSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    api_key_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ApiKey",
      required: true,
    },
    method: {
      type: String,
      enum: ["GET", "POST", "PUT", "DELETE"],
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    responseTime: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: "0 B",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ApiRequest || mongoose.model("ApiRequest", ApiRequestSchema);