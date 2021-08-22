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

// user login/ registration routes config
app.use("/auth", routes.authRoutes);

// user  routes config
app.use("/user", routes.userRoutes);

// admin route config
app.use("/admin", routes.adminRoutes);

// category route config
app.use("/category", routes.categoryRoutes);

// product route config
app.use("/product", routes.productRoutes);

// admin route config
app.use("/admin", routes.adminRoutes);

// order route config
app.use("/order", routes.orderRoutes);

// root route handler
app.get("/", (req, res) => {
  res.send("Welcome to Bando server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
