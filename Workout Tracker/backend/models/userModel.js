const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// static mathod
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("all field must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email alrady in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("all field must be filled");
  }
  const userr = await this.findOne({ email });
  if (!userr) {
    throw Error("Email inccorct");
  }
  const match = await bcrypt.compare(password, userr.password);
  if (!match) {
    throw Error("incoorect password");
  }
  return userr;
};

module.exports = mongoose.model("user", userSchema);
