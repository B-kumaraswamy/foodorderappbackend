import express from "express";
import bcrypt from 'bcrypt'
import signupCollection from "../models/signup.js";

const signUpRouter = express.Router()
signUpRouter.use(express.json())

signUpRouter.post('/', async(req, res) => {
    try {
        console.log('req from the frontend signup', req.body.body)
    const {name, email, phoneNumber, password} = req.body.body
    
    const existingUser = signupCollection.findOne({
        $or : [
          { phoneNumber :  phoneNumber},
          {email : email}
        ]
    }).count()

    if (existingUser > 0) {
        return res.status(400).json({status : 400, error : "PhoneNumber or Email already exists", message : "duplicates"})
    }

    else {
        /*
        let isAdmin
        if(email === "march123@gmail.com" || email === "") {
            isAdmin = true

        }
        else {
            isAdmin = false
        }
        */
        const newUser = new signupCollection({name : name, email : email, phoneNumber : phoneNumber, password : password})
        await newUser.save()
        return res.status(200).json({status : 200, message : "account created successfully"})
    }
    }

    

    catch(err) {
        console.log('entering signup catch', err)
        if (err.errors) {
            // Mongoose validation error
            const validationErrors = Object.values(err.errors).map(error => error.message)
            console.log("validationErrors", validationErrors)
            
            return res.status(400).json({status: 400, message: "Validation error", errors: validationErrors})
        }
        return res.status(500).json({status : 500, message : err})
    }
})

export default signUpRouter


/*
If err.errors contains validation errors, and assuming it follows the structure typically seen in Mongoose validation errors, 
here's a hypothetical example of what Object.values(err.errors) might look like:

{
    phoneNumber: {
        message: "1234567890 is not a valid Phone Number",
        name: "ValidatorError",
        properties: {
            message: "1234567890 is not a valid Phone Number",
            type: "regexp",
            path: "phoneNumber",
            value: "1234567890"
        },
        kind: "regexp",
        path: "phoneNumber",
        value: "1234567890"
    }
}


This object represents a validation error for the phoneNumber field. 
When using Object.values(err.errors), 
you would get an array containing only this object:

[
    {
        message: "1234567890 is not a valid Phone Number",
        name: "ValidatorError",
        properties: {
            message: "1234567890 is not a valid Phone Number",
            type: "regexp",
            path: "phoneNumber",
            value: "1234567890"
        },
        kind: "regexp",
        path: "phoneNumber",
        value: "1234567890"
    }
]

*/