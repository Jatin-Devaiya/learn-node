const express = require("express");
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

connectMongoDb("mongodb://localhost:27017/app-1");

// Middleware - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
