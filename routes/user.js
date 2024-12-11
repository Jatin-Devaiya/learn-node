const express = require("express");
const {
  handelGetAllUsers,
  handelgetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
  handelCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handelGetAllUsers).post(handelCreateNewUser);

router
  .route("/:id")
  .get(handelgetUserById)
  .patch(handelUpdateUserById)
  .delete(handelDeleteUserById);

module.exports = router;
