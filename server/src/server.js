const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./configuration/databaseConnection");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const uuid = require("uuid");
const app = express();
const jwt = require('jsonwebtoken')
const cors = require('cors')
dotenv.config();

const User = require("./schema/user");
app.use(express.json());   
app.use(cors())

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


const generateUsername = async(email) =>{
    let username = email.split("@")[0];
    let isUsernameTaken = await User.exists({"personal_info.username":username})
    if(isUsernameTaken){
        username = username + shortid.generate()
    }
    return username;
}

const formatDatatoSend = (user) =>{

    const access_token = jwt.sign({id:user._id},process.env.SECRET_ACCESS_KEY)

    return {
        access_token:access_token,
        profile_img:user.personal_info.profile_img,
        username:user.personal_info.username,
        fullname:user.personal_info.fullname,
    }
}





app.post("/signup",async(request,response) =>{

    let{fullname,email,password} = request.body;

    if(fullname.length < 3){
        return response.status(403).json({error:"fullname should be more then 3 character"})
    }

    if(emailRegex.test(email) === false){
        return response.status(403).json({error:"please enter a valid email"})
    }


    if(passwordRegex.test(password) === false){
        return response.status(403).json({error:"password should contain uppercase lowercase and number"})
    }


    const user = await User.findOne({"personal_info.email":email})
    if(user) return response.status(400).json({error:"user exists"})

    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password,salt)

    const username = await generateUsername(email)
    console.log(username);

    try {

        const newUser = new User({personal_info:{fullname,email,password:hashedPassword,username}});
        const userResponse = await newUser.save();
        return response.status(200).json(formatDatatoSend(userResponse))
        
    } catch (error) {
        return response.status(401).json({error:error.message})
    }
    

})



app.post("/signin",async(request,response) =>{


    let{email,password} = request.body;

    const isEmailexist = await User.findOne({"personal_info.email":email})

    if(!isEmailexist) return response.status(400).json({error:"user doesn't exist"})

    const correctPassword =  bcrypt.compareSync(password,isEmailexist.personal_info.password)

    if(!correctPassword) return response.status(401).json({error:"incorrect password"})

    response.status(200).json(formatDatatoSend(isEmailexist)) 

})



let PORT = 5000;
app.listen(PORT, async () => {
  console.log("Server is running on port 5000");
  await connectDatabase();
  console.log("database is live");
});



// data replication and sharding
// types of database and data  consitency
//lpoadbalancer and reverse proxy
// storage estimation 