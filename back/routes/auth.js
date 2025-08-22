const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { getToken , verifyToken } = require("../utils/helpers");
const passport = require("passport");



///// ===================== SIGN UP  =====================
router.post("/signup" , async (req, res) => {
    let { userName , email , phone , password } = req.body;

    if( !phone || phone.trim() === "") phone = undefined;

    if( !email || !password || !userName )
        return res.status(400).json({ error : "Email , password, UserName are required! "});

    const existing = await User.findOne({ email });
    if(existing) return res.status(409).json({ error: " Email Already Registered"  });

    const hashed = await bcrypt.hash(password, 10);
    const newUser= await User.create({
        userName,
        email,
        ...(phone && { phone } ),
        password : hashed
    });

    const token = await getToken(email , newUser);
    const usertoReturn = { ...newUser.toJSON() , token };
    delete usertoReturn.passport;
    return res.status(201).json(usertoReturn);
});


///// ================= LOGIN ==================

router.post("/login", async (req, res) => {
    try {
        const { email , password } = req.body;

        if( !email?.trim() || password?.trim() ){
            return res.status(400).json({
                success : false,
                message : 'Email and password are required'
            });
        }

        const user = await User.findOne({
            phone: phone.trim()
        }).select('+pasword');

        if(!user){
            console.log("No user found", email.trim());
            return res.status(401).json({ 
                success: false,
                message: 'Invalid Credentials'
             });
        }
        const isMatch = await bcrypt.compare(password.trim() , user.password);
        if(!isMatch){
            console.log("Password mismatch for user. ", user._id);
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const token = jwt.sign(
            { id : user._id , phone: user.phone },
            process.env.TOKEN,
            { expiresIn : '30d' }
        );

        const usertoReturn = user.toObject();
        delete usertoReturn.password;

        res.status(200).json({
            success: true,
            token,
            user: usertoReturn
        });
    } catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

///// ================== USER DATA OR PROFILE ================

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

router.get("/get/user/:userId" , passport.authenticate("user-jwt" , { session: false }), async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');

        if(!user){
            return res.status(404).json({ error : "User not found " });
        }
        return res.status(200). json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error : "Internal Server Error"});
    }
});


/// ====================== CHANGE PASSWORD =====================

const authenticate = async (req, res , next) => {
    const auth = req.headers.authorization;
    if ( !auth || !auth.startsWith('Bearer')) return res.status(401).json({ message : "No token." });
    const token = auth.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.TOKEN);
        req.user = { id: payload._id };
        next();
    } catch {
        return res.status(401).json({ message : "Invalid/expired token."});
    }
};

router.post('/changePassword' , authenticate, async (req, res ) => {
    try {
        const { oldpassword , newPassword } = req.body;
        if( !oldpassword || !newPassword) { 
            return res.status(400).json({ message : "All Fields are required."});
        }
        if(!req.user) {
            return res.status(401).json({ message : 'Unauthorized.'});
        }

        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({ message : 'User not found.'});

        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if(!isMatch) {
            return res.status(400).json({ message : "Old Password is incorrect."});
        }

        if(newPassword.length <= 8) {
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

module.exports = router;