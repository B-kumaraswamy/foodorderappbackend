import express from "express"
import signupCollection from "../models/signup.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
const loginRouter = express.Router()

loginRouter.use(express.json())

loginRouter.post("/", async(req, res) => {
    try {
        console.log("req from login frontend", req.body.body)

    const {email, password} = req.body.body

    if(email === "march123@gmail.com"){
      const jwt_admin_secret = "qwertyuiop"
      const adminUser = await signupCollection.findOne({email : email})
      const adminPassword = await bcrypt.compare(password, adminUser.password)
      if(adminPassword){
        const adminToken = await jwt.sign({email : email}, jwt_admin_secret)
        return res.status(200).json({status : 200, message : "Logged-in successfully as admin", token : adminToken})
      }
      else{
        return res.status(401).json({status : 401, message : "incorrect password"})
      }

    }
    else{
      const jwt_secret = "abcdefgh"
    //const hashedPassword = await bcrypt.hash(password, 10)
   
    const existingUser =   await signupCollection.findOne({email : email})
    
    if(existingUser) {
        console.log("existingUser login password", existingUser.password)
      const userHashedPassword = await bcrypt.compare(password, existingUser.password)
      console.log("userHashedPassword login", userHashedPassword)

      if(userHashedPassword) {
        const jwtToken = await jwt.sign({email : email}, jwt_secret)
        console.log("login jwtToken", jwtToken)
        //const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        return res.status(200).json({status : 200, message : "Logged-in successfully", token : jwtToken})
      }

      else{
        return res.status(401).json({status : 401, message : "incorrect password"})
      }
        
    }

    else {
        return res.status(404).json({status : 404, message : "email is not registered"})
    }


    }
    }

    catch(err) {
        return res.status(500).json({status : 500, message : "internal server error"})
    }

   
})


export default loginRouter