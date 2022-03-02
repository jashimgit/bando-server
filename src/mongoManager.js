import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectWithDB = () => {
  const uri = process.env.DB_URL;
  // const uri = `mongodb://localhost:27017/bando-db`
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  mongoose
    .connect(uri, options)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));
};

export default connectWithDB;
