const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken , verifyToken } = require("../utils/helpers");
const passport = require("passport");



/// adding the comments on everypart as to debug it easier. 

/*  Whenever you work on it try to keep in mind that we need to write it cleaner 
    and cleaner to keep and eye on the error and for beginners to learn it the 
    best way they like. 
 

*/

///// ===================== SIGN UP  =====================
router.post("/register" , async (req, res) => {
    // getting the user data
    let { userName , email , phone , password } = req.body;

/*  take let as i want to drop the phone values only if they are empty as to avoid 
    the equal values of phone only for null/undefined values.
    */ 
   // checking if phone is empty then i make it undefined.
    if( !phone || phone.trim() === "") phone = undefined;
    // checking that credentials aren't empty
    if( !email || !password || !userName )
        return res.status(400).json({ error : "Email , password, UserName are required! "});
    // checking for existing email 
    const existing = await User.findOne({ email });
    if(existing) return res.status(409).json({ error: " Email Already Registered"  });

    // hashing the password to make it hidden for user as well as developer
    const hashed = await bcrypt.hash(password, 10);
    // creating the user using schema in models
    const newUser= await User.create({
        userName,
        email,
        ...(phone && { phone } ),
        password : hashed
    });

    // getting the token using the token function in utils/helpers.js
    const token = await getToken(email , newUser);
    // what to return to the website and the signed in user
    const usertoReturn = { ...newUser.toJSON() , token };
    // now delete the password to make it secret on frontend and backend
    delete usertoReturn.password;
    // finally return the userdata on the frontend using this REST api
    return res.status(201).json(usertoReturn);
});


///// ================= LOGIN ==================


/** 
 *  lets go for login if there are any problem i will let you know in the issues section in my repo
 *  Dont be shy this is not that hard if you are unable to understand the parts of this 
    code just comment in my repo this portion i will give you a more better explaination.
 * 
 * 
*/
router.post("/login", async (req, res) => {
    // lets have a error handling using try and catch.
    try {
        // arguments from the UI
        const { email , password } = req.body;
    // check if email and password are in unrequired format.
        if( !email?.trim() || !password?.trim() ){
            // returning the false status so that we are able to debug where this error comes from.
            return res.status(400).json({
                success : false,
                message : 'Email and password are required'
            });
        }

        // finding the user in the database also with the password
        const user = await User.findOne({
            email: email.trim()
        }).select('+password');

        // if the user is not there
        if(!user){
            console.log("No user found", email.trim());
            return res.status(401).json({ 
                success: false,
                message: 'Invalid Credentials'
             });
        }
        // matching the passwords in the db
        const isMatch = await bcrypt.compare(password.trim() , user.password);
        // if doesnt match we failed the process.
        /**
         * you know what we are able to make this section much better but i have a lot of work
         * you can do make changes make it more robust with better handling errors.
         * Lets go to next section its just the message we get on the console.
        */ 
        if(!isMatch){
            console.log("Password mismatch for user. ", user._id);
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        // this signs token using the email and make it visible for 30 days
        const token = jwt.sign(
            { id : user._id , email: user.email },
            process.env.TOKEN,
            { expiresIn : '30d' }
        );

        // now return the object and delete the password so that it doesn't go to the frontend 
        // and we are able to maintain the security of data of user.
        const usertoReturn = user.toObject();
        delete usertoReturn.password;

        // return the success status
        res.status(200).json({
            success: true,
            token,
            user: usertoReturn
        });
    } 
    // if you catch any error out of this handling that we done in upper code 
    // it will be displayed here and we are able to debug it
    catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

///// ================== USER DATA OR PROFILE ================
/**
 * getting the data of user to himself
*/




router.get("/me" , verifyToken , passport.authenticate("user-jwt" , { session:false }), async (req,res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error " });
    }

});



//// ======================= GET USER BY ID =======================

router.get("/get/user/:userId" , passport.authenticate("user-jwt" , { session:false }),  async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({ error : "User not found " });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error : "Internal Server Error"});
    }
});


/// ====================== CHANGE PASSWORD =====================


router.post('/changePassword' , passport.authenticate("user-jwt" , { session:false }), async (req, res ) => {
    try {
        const oldpassword = req.body.oldpassword ?? req.body.oldPassword;
        const newPassword = req.body.newPassword ?? req.body.newpassword;

        if( !oldpassword || !newPassword) { 
            return res.status(400).json({ message : "All Fields are required."});
        }

        if (typeof newPassword !== 'string') {
            return res.status(400).json({ message : "Invalid new password."});
        }
        
        if(!req.user) {
            return res.status(401).json({ message : 'Unauthorized.'});
        }

        
        const user = await User.findById(req.user._id).select('+password');
        if(!user) return res.status(404).json({ message : `User not found.`});

        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if(!isMatch) {
            return res.status(400).json({ message : "Old Password is incorrect."});
        }

        
        if(newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters.'});
        }

        user.password = await bcrypt.hash(newPassword , 10);
        await user.save();

        res.json({ message : 'Password successfully changed.'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message : 'Server error. Please try again.'});
    }
});


//============================== ERROR CONSOLE ==========================


// To be implemented whenever needed.
router.post("/", (req,res , next) => {

});


module.exports = router;