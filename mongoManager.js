import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectWithDB = () => {
  // const uri = `mongodb+srv://nodemongo:${process.env.DB_PASS}@cluster0.vewnd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const uri = `mongodb://localhost:27017/bando-db`
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  mongoose
    .connect(uri, options)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));
};

export default connectWithDB;
