const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email value"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Please add a username value"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a title value"],
    },
   
  },
  {
    timestamps: true,
  }           
);              
                 
module.exports = mongoose.model("User", userSchema);
