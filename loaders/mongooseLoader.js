const mongoose = require("mongoose");

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, () => {
      console.log("Succesfully connect to mongoDB");
    });
  } catch (err) {
    console.error("initial connection error: ", err);
  }

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });

  db.on("error", (err) => {
    console.error("Connection error: ", err);
  });
}

module.exports = connectToMongoDB;
