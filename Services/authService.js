const bcrypt = require("bcryptjs");
const { Users } = require("../Models/users");

const { createToken } = require("../middlewares/generate");

const signUp = async (userData) => {
  const { name, email, password, phone_No,city } = userData;

  const data = {
    name,
    email,
    password,
    phone_No,
    city
  };

  let res = {};
  const userExist = await Users.findOne({ email });

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>userExist", userExist);

  if (!userExist) {
    const hashedPassword = await bcrypt.hash(password, 8);

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>hashedPassword", hashedPassword);

    const createUserRes = await Users.create({
      ...data,
      password: hashedPassword,
    });

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>createUserRes", createUserRes);

    if (createUserRes) {
      res = {
        success: true,
        message: "Added user successfully.",
      };
    } else {
      res = {
        success: false,
        message: "Something went wrong.",
      };
    }
  } else {
    res = {
      success: false,
      message: `User already exists with email ${email}.`,
    };
  }
  return res;
};

const login = async (loginParams) => {
  const { email, password } = loginParams;

  const usersData = await Users.findOne({ email });
  let res = {};
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>usersData", usersData);

  if (usersData) {
    // match password
    const isPasswordMatch = await bcrypt.compare(
      password.trim(),
      usersData.password
    );
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>isPasswordMatch", isPasswordMatch);

    if (isPasswordMatch) {
      const token = await createToken(usersData);

      res = {
        success: true,
        message: "User Log in successfully.",
        data: { ...usersData.toJSON(), token },
      };
      
    } else {
      res = {
        success: false,
        message: "Incorrect password.",
      };
    }
  } else {
    res = {
      success: false,
      message: `No User found with email ${email}.`,
    };
  }
  return res;
};

module.exports = {
  signUp,
  login,
};
