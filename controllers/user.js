const User = require("../routes/user");

async function handelGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handelgetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ errro: "user not found" });
  return res.json(user);
}

async function handelUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, { ...req.body });
  return res.json({ status: "Success" });
}

async function handelDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Success" });
}

async function handelCreateNewUser(req, res) {
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

  return res
    .status(201)
    .json({ msg: "User created successfully", id: result._id });
}

module.exports = {
  handelGetAllUsers,
  handelgetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
  handelCreateNewUser,
};
