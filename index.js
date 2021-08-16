import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectWithDB from "./mongoManager";
import routes from "./routes";
dotenv.config();

const app = express();

// initialize port number
const port = process.env.PORT || 8000;

// connect database with ORM
connectWithDB();

// middleware handler
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// user login/ registration routes
app.use("/auth", routes.userRoutes);



// category route
app.use("/category", routes.categoryRoutes);

// product route 
app.use('/product', routes.productRoutes)


// root route handler
app.get("/", (req, res) => {
  res.send("Welcome to Bando server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
