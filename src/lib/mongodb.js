import mongoose from "mongoose";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI);
}

export default mongoose;
