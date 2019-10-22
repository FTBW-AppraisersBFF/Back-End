const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");

const favRoute = require("../routes/restricted/fav/fav");
const authRouter = require("../auth/authRouter");
const housesRoutes = require("../routes/restricted/houses/houses");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/api/fav", favRoute);
server.use("/api/houses", housesRoutes);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("Server Running");
});

module.exports = server;
