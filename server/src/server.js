const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDatabase = require("./configuration/databaseConnection");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");
const uuid = require("uuid");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const admin = require("firebase-admin");
// const { nanoid } = require("nanoid");
// const serviceAccount = require('./configuration/firebase.json')
const { getAuth } = require("firebase-admin/auth");

const aws = require("aws-sdk");



const User = require("./schema/user");
app.use(express.json());
app.use(cors());

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "medium-adc3f",
    private_key_id: "1afa2cdbcf5f10d3b71f993fc318a637538b67d2",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZ8nW5Jpjis0o6\nw+jLqyIxRMV7RWysTTqP0dDY/rk2DXmoZ+nBgSlkFi1hgpcrxI7uK+A33uZPdVOr\nbcgiFgW6TuHyyzM16gp5n2HRZCjpjdc59Wgv/HFGatf7PcdBOL6xDGD0GI5lpmGK\nvLlf3PAgogDbSAEWLjUzpHX7NluOXOpA7xEQjI5YMImX8sOYeq9Bi6YEvBlz3EL/\na+7a8T88N69JJ9liS0ff2HBaOGbW+xtI2MhR9pJXloZnRBHhIkAPCwUwOElpJMMJ\nqhFwOx4olUcYdu4hVbZAAZ4ebF0A6uCn/nnk4w0l4uHW3h/89IgiiNEQzusk9yc2\nVCi2NF/nAgMBAAECggEABKVTdxfoiGST/36vlq/WMcCqiP8o2t9mkSxCzG1Zm1pc\nLofQhsxvCnAilYKIIGm3NkJ/LBG3TRhOKUhUzM01YAxQarGELPEJOiB4oFMHQDtC\nzDx79RHnhD3Azt05Qx2nivSdmHZxip8qUx/Ev9Ng1wE9DW+SfluLzMcDsNAu0XEF\nh0/31X7PItjtj4vZD2JvsoH34OFsecximfdr3VK2Ss8v7uQJrOuTyQ89Xs9ckDtG\nv8DDI70E5V9SUT6yG0gaDV3whLBUG2KAFdB8br9B9aN69IkPLfzh625xYm7aqQbB\nibov3Z092rvDaAglBUbGIe0h5+Rvdp/g5Lpcj9qbkQKBgQDsbI2YohMAHPFd4u1U\nO6qwJ2oXl0e7u+8GiVRBuRwQPpcUqqa1OfpnEdW+8Z9lF0S2Dd2jp0yNNYjfnEYp\npHW7JHAtxf1IgHdIRRsWl43QP4Ee2shYjh1j5u3yNPoSCMJO2x6hUPx8j9hNadnc\n/CMGnIU6HxReHYVgbGdZKR0ZWQKBgQDr/kECJoXmnuxEW+MOYXxrabkIf+hMRN8N\nfCKzxqbkUAB9psGKmhFYKrr2qvu1xla+GecBZBV4sSGuwItPxv1FbRSKVbwMgZR4\nscMpKnaQ/7ibUadOdyvgrPBWikvLFTgK1wDn0us+T75SflMMryBpY7KfvFcqEC2D\nPeAdBrzbPwKBgEFfDpPalJheaFrGaUr2KI8Ghu449SuynjfXdwWpMlpHhCzBttC7\nVEJ1iv19/83K7kPMd7FNi/wrhkoWAsx23dq+C4qMiSkn5FOGUCQiCaNAO+qVIfpi\naTv7WWW0QkUESP3W1pRSOU4T1AIrt4LD8MdeNfRJLa+MSBnOP5FGrfYZAoGAdTIE\n0q6S3J6bsq73KVMcWLNeImxyzj19j9LP4PuMMeHQ/JVtlAlDB8fgpVLwQatHtIxk\nffpX92Hv2jrgdDPb3zh2dORyyLspIm8U/kKKMyPrZ6a7MWpZLfB0QmXXkfjtpeR0\nHKxQCtfLKmh1kdz+eZf7QvxjRQ5Xq890lrWb4D0CgYAyAkAuAKqEYtTy2L65Gllh\nNQbfTxk4sZt0+LGupJRDj5qNxBFYBtJZqZ8FlAqISk8YXCaiNdAQk40oe13rvpQ6\niP9S8MBY1j3lYwCXYlqgzSNUMcSQEwjwKBmEVMf5FpjVorjcQB1tSIhi2zS2YOB/\noAX7RCcLZMmL3MzH14RuEA==\n-----END PRIVATE KEY-----\n",
    client_email:
      "firebase-adminsdk-tjnfj@medium-adc3f.iam.gserviceaccount.com",
    client_id: "100257307803719564912",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tjnfj%40medium-adc3f.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});


// setting up the aws s3 bucket


const s3 = new aws.S3({
    region:'ap-south-1',
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRETE_ACCESS_KEY
})

// get url

const generateUploadUrl = async () =>{


    const date = new Date();
    const imageName = `${uuid.v1()}-${date.getTime()}.jpeg`;

    return await s3.getSignedUrlPromise('putObject',{
        Bucket:'medium-image',
        Key:imageName,
        Expires:1000,
        ContentType:'image/jpeg'
    })
    

}

const generateUsername = async (email) => {
  let username = email.split("@")[0];
  let isUsernameTaken = await User.exists({
    "personal_info.username": username,
  });
  if (isUsernameTaken) {
    username = username + shortid.generate();
  }
  return username;
};

const formatDatatoSend = (user) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );

  return {
    access_token: access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
};

app.post("/signup", async (request, response) => {
  let { fullname, email, password } = request.body;

  if (fullname.length < 3) {
    return response
      .status(403)
      .json({ error: "fullname should be more then 3 character" });
  }

  if (emailRegex.test(email) === false) {
    return response.status(403).json({ error: "please enter a valid email" });
  }

  if (passwordRegex.test(password) === false) {
    return response
      .status(403)
      .json({
        error: "password should contain uppercase lowercase and number",
      });
  }

  const user = await User.findOne({ "personal_info.email": email });
  if (user) return response.status(400).json({ error: "user exists" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const username = await generateUsername(email);
  console.log(username);

  try {
    const newUser = new User({
      personal_info: { fullname, email, password: hashedPassword, username },
    });
    const userResponse = await newUser.save();
    return response.status(200).json(formatDatatoSend(userResponse));
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
});

app.post("/signin", async (request, response) => {
  let { email, password } = request.body;

  const isEmailexist = await User.findOne({ "personal_info.email": email });

  if (!isEmailexist)
    return response.status(400).json({ error: "user doesn't exist" });

  const correctPassword = bcrypt.compareSync(
    password,
    isEmailexist.personal_info.password
  );

  if (!correctPassword)
    return response.status(401).json({ error: "incorrect password" });

  response.status(200).json(formatDatatoSend(isEmailexist));
});

app.post("/google-auth", async (request, response) => {
  let { access_token } = request.body;

  getAuth()
    .verifyIdToken(access_token)
    .then(async (decodedUser) => {
      let { email, name, picture } = decodedUser;

      picture = picture.replace("s96-c", "s400-c");

      let user = await User.findOne({ "personal_info.email": email })
        .select(
          "personal_info.fullname personal_info.username personal_info.profile_img google_auth"
        )
        .then((u) => {
          return u || null;
        })
        .catch((error) => {
          return response.status(500).json({ error: error.message });
        });

      if (user) {
        if (user.google_auth === false) {
          return response
            .status(403)
            .json({ error: "please login with email and password" });
        }
      } else {
        let username = await generateUsername(email);
        user = new User({
          personal_info: {
            fullname: name,
            email: email,
            username: username,
            profile_img: picture,
            google_auth: true,
          },
        });

        await user
          .save()
          .then((u) => {
            user = u;
          })
          .catch((error) => {
            return response.status(500).json({ error: error.message });
          });
      }

      return response.status(200).json(formatDatatoSend(user));
    })
    .catch((error) => {
      console.log(error.message);
      return response
        .status(500)
        .json({ error: "can not authenticate with google" });
    });
});




//* upload image to s3 bucket

app.get("/get-upload-url",async(request,response) =>{
    generateUploadUrl()
    .then((url) => response.status(201).json({
        uploadUrl:url
    }))
    .catch((error) =>{
        console.log(error.message);
        return response.status(500).json({
            error:error.message
        })
    } )
    
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
