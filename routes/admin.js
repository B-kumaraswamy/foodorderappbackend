import express from "express"
import multer from "multer"
import foodDetails from "../models/foodSchema.js"
import jwt from "jsonwebtoken"
import signupCollection from "../models/signup.js"
const AdminRouter = express.Router()
const upload = multer()

AdminRouter.use(express.json())

AdminRouter.post("/bulk", upload.single("file"), async(req, res) => {
   try {
     //console.log("req from frontend", req.headers.authorization.split(" ")[1])
    //console.log("req file from frontend", req.file)
    const fileContent = req.file.buffer.toString()
    //console.log("fileContent in string format", fileContent)
    
   console.log("token trim", req.headers.authorization) 
    const jwt_secret = "qwertyuiop"
    
    if(req.headers.authorization.trim() === "Bearer") {

        return res.status(401).json({status : 401, message : "Authentication Failed, Token not Found"})
    }
    const token = req.headers.authorization.split(" ")[1]
    console.log("token", token)
    jwt.verify(token, jwt_secret, (err, decoded) => {

        if(err) {
            console.log("token verification failed")
            return res.status(401).json({status : 401, message : "unauthorized user"})
        }
        else {
            console.log("token verified successfully", decoded)
        }
       
    })
    //console.log("existingEmail", existingEmail)
    //const authorizedUser = await signupCollection.findOne({email : existingEmail})
    //console.log("authorizedUser", authorizedUser)
    /*if(!authorizedUser) {
        return res.status(401).json({status : 401, message : "unauthorized user"})
    }*/

    const rows = fileContent.split("\r\n")
    let totalRowsAdded = 0
    console.log("rows lenght", rows.length)
    let ignoredRows = []
    for(let i=1; i<(rows.length-1); i++) {
        const eachRow = rows[i].split(",")
        console.log(eachRow)
        const restaurant = eachRow[0].trim()
        const category = eachRow[1].trim()
        const dishName = eachRow[2].trim()
        const price = eachRow[3].trim()
        const imageUrl = eachRow[4].trim()
        console.log("rows", restaurant, category, dishName)
    const existingFoodDetails = await foodDetails.findOne({restaurant : restaurant, dishName : dishName})
    console.log("existingFoodDetails findOne", existingFoodDetails)
        
        if(!existingFoodDetails) {
            //console.log("entering !existing food details")
            totalRowsAdded += 1
            //console.log("totalRowsAdded", totalRowsAdded)
            const newFoodDetails = new foodDetails({restaurant : restaurant, category : category, dishName : dishName, price: price, imageUrl : imageUrl})
            //console.log("newFoodDetails", newFoodDetails)
            await newFoodDetails.save()
        }

        else {
            ignoredRows.push(eachRow)
            console.log("ignored rows", ignoredRows)
        }

    } 

    const totalRows = rows.length-2  //one is heading line and other is empty string at the end
   
    const totalRowsIgnored = totalRows - totalRowsAdded  
  
    return res.status(200).json({status : 200, message : "file uploaded successfully", result : `${totalRowsAdded} added and ${totalRowsIgnored} ignored out of ${totalRows} `, ignoredRows : ignoredRows })
   }

   catch(err) {
    res.status(500).json({status : 500, message : "internal server error"})
   }
})

export default AdminRouter