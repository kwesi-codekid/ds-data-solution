import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://kwasibordes:Webdevtisgud4me@kwasidev.2j6iayq.mongodb.net/ds-data-solutions"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Connected to MongoDB");
});

export default mongoose;
