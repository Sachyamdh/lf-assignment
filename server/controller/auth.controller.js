const signUp = async (req, res) => {
  console.log("Sign up initiated", req.body);
  res.status(201).json({ message: "User created successfully" });
};

module.exports = { signUp };
