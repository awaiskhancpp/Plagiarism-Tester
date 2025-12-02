import mongoose from "mongoose";
import dns from "dns";
<<<<<<< HEAD
// dns.setDefaultResultOrder("ipv4first");
=======
dns.setDefaultResultOrder("ipv4first");
>>>>>>> a745fc646b986d8962debdedd7bcabb5de6d2a64
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI);
}

export default mongoose;
