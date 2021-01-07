const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//INITIAL SETUP
const server = express();
dotenv.config();
const port = process.env.PORT;

//MIDDLEWARES
server.use(express.json());
//ROUTES

server.listen(port, () => {
	if (server.get("env") === "production")
		console.log("Server is running on CLOUD on PORT:", port);
	console.log("Server is running LOCALLY on PORT:", port);
});
