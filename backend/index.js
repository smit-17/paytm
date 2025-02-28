const express = require("express");
const route = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api/v1", route);
app.listen(3000);
