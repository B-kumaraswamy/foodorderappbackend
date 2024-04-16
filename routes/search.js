import express from "express"
import foodDetails from "../models/foodSchema.js"
const searchRouter = express.Router()
searchRouter.use(express.json())

searchRouter.get("/:dishName", async(req, res) => {
    try {
        const {dishName} = req.params
    console.log("dishName", dishName)
    console.log("req from frontend in search", req)
    
   const rowDetails  =  await foodDetails.find({ dishName : {$regex : new RegExp(dishName, "i")}})
    console.log("rowDetails", rowDetails)

    if(rowDetails.length !== 0) {
        
        return res.status(200).json({status : 200, message : rowDetails})
    }

    else {
        return res.status(404).json({status : 404, message : "Items not found"})
    }
    }

    catch(err) {
        return res.status(500).json({status : 500, message : "internal server error"})
    }
        
})
    



export default searchRouter

/*
{ dishName: ... }: This part defines a MongoDB query object. It specifies that we are searching for documents where the dishName field matches certain criteria.

{ $regex: new RegExp(dishName, "i") }: Within the dishName field, we're using the $regex operator to perform a regular expression search.

new RegExp(dishName, "i"): Here, we are constructing a regular expression object using the JavaScript RegExp constructor. The first argument to RegExp is the pattern to search for, which in this case is the dishName variable. The second argument "i" specifies that the search should be case-insensitive, meaning it will match both uppercase and lowercase letters.

Putting it all together, { dishName: { $regex: new RegExp(dishName, "i") } } means we're searching for documents where the dishName field matches the regular expression constructed from the dishName parameter passed to the route handler, and the search is case-insensitive. This query will return all documents where the dishName field contains the value of dishName provided in the route parameter.

*/