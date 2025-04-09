import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import signUpRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import AdminRouter from "./routes/admin.js";
<<<<<<< HEAD
import dotenv from "dotenv"
=======
import dotenv from "dotenv";
>>>>>>> 38ce34e (db url and authentication changed)
import searchRouter from "./routes/search.js";
import restaurantRouter from "./routes/restaurant.js";
import cartRouter from "./routes/cart.js";

<<<<<<< HEAD
dotenv.config()

const port  = 8080 

const app = express()

app.use(express.json())

app.use(cors())

app.use('/signup', signUpRouter)

app.use("/login", loginRouter)

app.use("/products", AdminRouter)

app.use("/search", searchRouter)

app.use("/restaurant", restaurantRouter)

app.use("/cart", cartRouter)

app.listen(process.env.PORT || port, () => {
    console.log('connected to port 8080')
})

mongoose.connect(process.env.DB_URL)
.then(() => console.log('connected to mongoose db'))
=======
dotenv.config();

const port = 5000;

const app = express();

const DB_URL = process.env.MONGODB_URI;

app.use(express.json());

app.use(cors());

app.use("/signup", signUpRouter);

app.use("/login", loginRouter);

app.use("/products", AdminRouter);

app.use("/search", searchRouter);

app.use("/restaurant", restaurantRouter);

app.use("/cart", cartRouter);

app.listen(process.env.PORT || port, () => {
  console.log("connected to port 8080");
});

mongoose
  .connect(DB_URL || "mongodb://localhost:27017/foodApp")
  .then(() => console.log("connected to mongoose db"));
>>>>>>> 38ce34e (db url and authentication changed)
