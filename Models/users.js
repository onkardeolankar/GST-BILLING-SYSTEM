const { Schema, model } = require("mongoose");

const UsersSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    require: true,
  },
  city:{
    type:String,
    require:true
  }
});

const Users = model("users", UsersSchema);

module.exports = { Users };
