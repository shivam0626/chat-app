const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.pvju6xo.mongodb.net/chatAppMern?retryWrites=true&w=majority`
    );

    