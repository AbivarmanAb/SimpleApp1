const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas (Mongoose 7+ automatically handles parsing and topology)
mongoose.connect(
  "mongodb+srv://abivarman5032_db_user:OxzckU6riim3Udvr@cluster0.ia2ri8t.mongodb.net/mydb"
)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use("/messages", messageRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
