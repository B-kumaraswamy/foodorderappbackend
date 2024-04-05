import mongoose from "mongoose";

const FoodDetailsSchema = new mongoose.Schema({
    restaurant : {
        type : String 
    },
    category : {
        type : String
    },
    dishName : {
        type : String
    },
    price : {
        type : String
    }, 
    imageUrl : {
        type : String
    }
})

const foodDetails = new mongoose.model("foodDetails", FoodDetailsSchema)

export default foodDetails