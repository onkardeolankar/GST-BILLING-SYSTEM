const AuthService = require("../Services/authService");

const signUp = async (req, res) => {
  const response = await AuthService.signUp(req.body);

  res.send(response);
};

const login = async (req, res) => {
  const response = await AuthService.login(req.body);

  res.send(response);
};

module.exports = { signUp, login };
