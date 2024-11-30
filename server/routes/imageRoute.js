const express = require("express");
const {generateImage} = require('../Controller/imageController');
const {userAuth} = require("../middlewares/auth");

const imageRouter = express.Router();

imageRouter.post('/generateImage',userAuth,generateImage);

module.exports = {imageRouter};
