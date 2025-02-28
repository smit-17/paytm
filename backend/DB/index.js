const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://smitsurani18:Smit%4013282328@cluster0.xijwj.mongodb.net/newPaytm"
);

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  username: String,
});

const BankSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);
const Bank = mongoose.model("Bank", BankSchema);

module.exports = {
  User,
  Bank
};
