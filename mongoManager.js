import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectWithDB = () => {
  const uri = `mongodb+srv://nodemongo:${process.env.DB_PASS}@cluster0.vewnd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(uri, options)
    .then(() => console.log("Connected to DB"))
    .catch((e) => console.log(e));
};

export default connectWithDB;
