const { Router } = require("express");
const { User, Bank } = require("../DB");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const userRoute = Router();
userRoute.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const existUser = await User.findOne({
      email: email,
    });
    if (existUser?._id) {
      return res.status(400).json({ msg: "User Already Exist" });
    }
    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });
    if (user?._id) {
      await Bank.create({
        userId: user?.id,
        balance: 10000,
      });
      res.status(200).json({ msg: "User Created Successfully" });
    }
  } catch (e) {
    res.send(e);
  }
});
userRoute.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const existUser = await User.findOne({
      email: email,
      password: password,
    });
    if (!existUser?._id) {
      return res.status(400).json({ msg: "Email is not exist" });
    }
    const token = jwt.sign({ userId: existUser?._id }, "Smit@1212");
    res.status(200).json({
      msg: "Login Successfully",
      userDetails: {
        token: token,
        user: {
          id: existUser?._id,
          name: existUser?.username,
          email: existUser?.email,
        },
      },
    });
  } catch (e) {
    res.send(e);
  }
});
userRoute.get("/getAllUser", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [{ username: { $regex: filter } }, { email: { $regex: filter } }],
    });
    return res.json({ users: users });
  } catch (e) {
    res.send(e);
  }
});
module.exports = userRoute;
