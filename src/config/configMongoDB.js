import mongoose from "mongoose";
import "dotenv/config";

const config = {
  mongoDB: {
    URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.g6udpni.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};


export const connectMongoDB = async () => {
  try {
    await mongoose.connect(config.mongoDB.URL, config.mongoDB.options);
    console.log("\u001b[1;36m Connection successful at the database")
  } catch (error) {
    console.error("\u001b[1;31m Connection failed at the database" + error);
  }
};
