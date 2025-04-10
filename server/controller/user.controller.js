const AppError = require("../middleware/AppError");
const User = require("../services/user.service");

const getAllUsers = async (req, res) => {
  const users = await User.getAllUsers();
  if (!users) {
    throw new AppError("User not found", "User not found", 404);
  }
  res.status(200).json({ status: "success", data: users });
};

const getUserById = async (req, res) => {
  const userId = req?.params.id;
  const user = await User.getSingleUser(parseInt(userId));

  if (!user) {
    throw new AppError("User not found", "User not found", 404);
  }
  res.status(200).json({ status: "success", data: user });
};

const updateUser = async (req, res) => {
  const userId = req?.params.id;
  const user = await User.updateUser(parseInt(userId), req.body);
  if (!user) {
    throw new AppError("User not found", "User not found", 404);
  }
  res.status(200).json({ status: "success", data: user });
};

const deleteUser = async (req, res) => {
  const { id } = req?.params;
  const { password } = req?.body;

  const user = await User.deleteUser(parseInt(id), password);
  if (!user) {
    throw new AppError("User not found", "User not found", 404);
  }

  res.status(200).json({ message: "User deleted successfully" });
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
