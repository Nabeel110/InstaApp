const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.options("*", cors());

//middlewares
// app.use(bodyParser.json());
app.use(express.json());
// app.use(morgan("tiny"));

//config
dotenv.config();

// Databse Connection
connectDB();

//Defining Routes
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/posts", postsRouter);

//Handling 404 route
app.use(notFound);

//Custom error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
