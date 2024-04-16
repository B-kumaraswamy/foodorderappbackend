import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt"

const signUpSchema = new mongoose.Schema({
    name : {
        type : String,
        validate : {
            validator : function(v) {
                const trimmedName = v.trim()
                return trimmedName.length >= 1
            },
            message : object => `name: name is required`
        }
      
    },

    phoneNumber : {
        type : String,
        validate : {
            validator : function(v) {
               return /^\d{10}$/.test(v)
            },
        message : object => `phoneNumber: ${object.value} is not a valid Phone Number`
        }
        
    },

    email : {
        type : String,
        validate : {
            validator : function(v) {
              return  /^[^\s@]+@(gmail|outlook)\.com$/.test(v)
            },
            message : object => `email: ${object.value} is not a valid mailId`
        }
    },

    password : {
        type : String,
        validate : {
            validator : function(v) {
                return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v)
            },
           /* message : object => `password: ${object.value} is not a valid password`*/
            message : object => `password: *not a valid password. It should've atleast one capital letter, one small letter, one digit and one special character among (@$!%*?&)`
        }
        
    }
})




signUpSchema.pre('save', async function(next){
    try {
        console.log('Original Password:', this.password);
        const hashedPassword = await bcrypt.hash(this.password, 10)
        console.log('Hashed Password:', hashedPassword);
        this.password = hashedPassword 
        next()
    }

    catch(err) {
        next(err)
    }
})

const signupCollection = new mongoose.model( "signupCollection", signUpSchema)

export default signupCollection


/*
validate is the property of mongoose.
The validator function will get the argument v(which is the value you want to validate), 
test(v) returns true/false based on whether the validation is passed or not.
message property is not invoked by mongoose if test() returns true
if test() returns false, mongoose will create an object with fields value,validator,path,etc.. 
and passes the object to message as an argument,
object.value will contain the value we are validating for.


meaning of some regular expressions used on strings:
^ - start of the string
$ - end 
. - any character
* - any number of times 
\d - for digits 
\s - space
[^] - When ^ is the first character within the brackets, 
      it negates the character set, 
      meaning it matches any character not specified within the brackets.

| - or 
[] - character set for consideration/match

*/

/*
pre-save hook is used to hash the password before saving it to the database
pre('save') middlewares are called before executing save() by mongoose
so, we can hash the password in this middleware
next() in the function is to pass the control to next middleware



Defining the pre-save hook before creating the model using mongoose.model ensures that the hook is properly registered with the schema 
before any documents are created or saved. This is important because the pre-save hook needs to be in place and active when documents are being saved to the database.

Mongoose executes middleware functions in the order they are defined.
 If you define the pre-save hook after creating the model using mongoose.model, there's a chance that documents could be saved to the database before the hook is registered. 
 This could lead to situations where the pre-save hook is not executed for some documents, potentially causing inconsistencies in your data.

By defining the pre-save hook before creating the model, 
you ensure that the hook is registered and ready to intercept and modify documents before they are saved to the database. 
This helps maintain the integrity of your data and ensures that any necessary preprocessing, such as hashing passwords, 
is consistently applied to all documents.



*/