const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();
const PORT = 8000;

//conection
mongoose
  .connect("mongodb://localhost:27017/app-1")
  .then(() => console.log("Mongo DB connected"))
  .catch((err) => console.log("mongo error", err));

//schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

// Middleware - Plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app.get("/api/users/:id", async (req, res) => {
  //get  user with id
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ errro: "user not found" });
  return res.json(user);
});

app.patch("/api/users/:id", async (req, res) => {
  // update user with id
  await User.findByIdAndUpdate(req.params.id, { ...req.body });
  return res.json({ status: "Success" });
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
});

// app.route("/api/users/:id").delete((req, res) => {
//   //Delete the users with id
//   const id = Number(req.params.id);
//   const deleteIdx = users.findIndex((user) => user.id === id);

//   users.splice(deleteIdx, 1);

//   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//     if (err) console.log(err);
//     console.log("works");
//     return res.json({ status: "user deleted successfully" });
//   });
// });

app.post("/api/users", async (req, res) => {
  //create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field are required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "User created successfully" });
});

// print HTML
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
        <ul>
        ${allDbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
