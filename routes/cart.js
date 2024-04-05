import express from "express"
import foodDetails from "../models/foodSchema.js"
const cartRouter = express.Router()

cartRouter.use(express.json())

cartRouter.get("/", async(req, res) => {
    try {
        console.log("req from the frontend cart component", req.query)

    const itemIdsArray = Object.values(req.query)
    console.log("itemIdsArray in the cartRouter", itemIdsArray)

    let cartList = []
    for(let i = 0; i<itemIdsArray.length; i++) {
       const result =  await foodDetails.findOne({_id : itemIdsArray[i]})
       cartList.push(result)

    
    }

    return res.status(200).json({status : 200, message : "success", result : cartList})
    }

    catch(err) {
        return res.status(500).json({status : 500, message : "internal server error"})
    }
})

export default cartRouter