import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
<<<<<<< HEAD
    enum: ["student", "teacher", "developer"],
=======
    enum: ["student", "teacher", "researcher"],
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
