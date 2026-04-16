const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const carRoutes = require("./routes/carRoutes");
const packageRoutes = require("./routes/servicePackageRoutes");
const serviceRoutes = require("./routes/serviceRecordRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());


app.use(express.json());
app.use(bodyParser.json())

// Routes

app.use("/api/cars", carRoutes);
app.use("/api/packages", packageRoutes);
// app.use("/api/services", serviceRoutes);
app.use("/api/service-records", serviceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});