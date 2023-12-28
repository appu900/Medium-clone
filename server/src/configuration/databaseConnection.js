const mongoose = require('mongoose')

async function connectDatabase(){
    await mongoose.connect("mongodb+srv://appudq670:jarvis7735@medium-database.tr6upa7.mongodb.net/?retryWrites=true&w=majority",{
        autoIndex: true,
    })
}

module.exports = connectDatabase;