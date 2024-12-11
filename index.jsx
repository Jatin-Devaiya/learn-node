const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", (req, res) => {
  res.setHeader("myName", "JD"); // custum  header
  console.log(req.headers, "req.feaders.......");
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  //get  user with id
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) return res.status(404).json({ errro: "user not found" });
  return res.json(user);
});

app.route("/api/users/:id").delete((req, res) => {
  //Delete the users with id
  const id = Number(req.params.id);
  const deleteIdx = users.findIndex((user) => user.id === id);

  users.splice(deleteIdx, 1);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) console.log(err);
    console.log("works");
    return res.json({ status: "user deleted successfully" });
  });
});

app.post("/api/users", (req, res) => {
  //create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All field are required" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

// print HTML
app.get("/users", (req, res) => {
  const html = `
        <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
  res.send(html);
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
