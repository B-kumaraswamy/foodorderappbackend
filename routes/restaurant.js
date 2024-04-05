import express from "express"
import foodDetails from "../models/foodSchema.js"
const restaurantRouter = express.Router()

restaurantRouter.use(express.json())

restaurantRouter.get("/:restaurantName", async(req, res) => {
   try {
    console.log("req in the restaurant router", req)
    const {restaurantName} = req.params 
    console.log("restaurantName", restaurantName)

   const restaurantDetails =  await foodDetails.find({restaurant : restaurantName})

    return res.status(200).json({status : 200, message : "success", result : restaurantDetails})
   }

   catch(err) {
    return res.status(500).json({status : 500, message : "internal server error"})
   }
})


export default restaurantRouter