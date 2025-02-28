const { default: mongoose } = require("mongoose");
const { Bank } = require("../DB");
const authMiddleware = require("../middlewares/authMiddleware");

const { Router } = require("express");
const accountRoute = Router();

accountRoute.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await Bank.findOne({
      userId: req.userId,
    });
    if (account?._id) {
      res.json({ balance: account.balance });
    }
  } catch (e) {
    res.send(e);
  }
});
accountRoute.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { balance, to } = req.body;

  const fromBalance = await Bank.findOne({ userId: req.userId }).session(
    session
  );
  console.log(balance,fromBalance?.balance,"balancebalancebalancebalance");
  

  if (balance > fromBalance?.balance) {
    await session.abortTransaction();
    return res.json({ msg: "Insuffient Balance" });
  }
  const toUser = await Bank.findOne({
    userId: to,
  }).session(session);
  if (!toUser?._id) {
    await session.abortTransaction();
    return res.status(400).json({ msg: "User deos not exist" });
  }
  await Bank.updateOne(
    { userId: req.userId },
    {
      $inc: {
        balance: -balance,
      },
    }
  ).session(session);
  await Bank.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: balance,
      },
    }
  );
  session.commitTransaction();
  res.status(200).send("Transer successfully");
});
module.exports = accountRoute;
