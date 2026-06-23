const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./route/user.route.js");
const productRoute = require("./route/productRoute.js");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Progress! Your route is working.");
});
app.use("/api/auth", userRoute);
app.use("/api/product", productRoute);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(" ✅ Sucessfully connected to MongoDB!"))
  .catch((error) => console.error("MongoDB connection error:", error));
