const authService = require('../services/auth.service');


///// ===================== SIGN UP  =====================
const register = async (req, res) => {
    try {
        // getting the user data
        let { userName, email, phone, password } = req.body;


        // checking if phone is empty then i make it undefined.
        if (!phone || phone.trim() === "") phone = undefined;
        // checking that credentials aren't empty
        if (
            typeof email !== 'string' || email.trim().length === 0 ||
            typeof password !== 'string' || password.trim().length === 0 ||
            typeof userName !== 'string' || userName.trim().length === 0
        ) {
            return res.status(400).json({ error: "Email , password, UserName are required! " });
        }
        // checking for existing email 
        const existing = await authService.findExistingUser(email);
        if (existing) return res.status(409).json({ error: " Email Already Registered" });

        // creating the user (hashing handled by service)
        const newUser = await authService.createUser({
            userName,
            email,
            phone,
            password
        });

        // getting the token using the token function
        const token = await authService.generateRegisterToken(email, newUser);
        // what to return to the website and the signed in user
        const usertoReturn = { ...newUser.toJSON(), token };
        // now delete the password to make it secret on frontend and backend
        delete usertoReturn.password;
        // finally return the userdata on the frontend using this REST api
        return res.status(201).json(usertoReturn);
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


///// ================= LOGIN ==================



const login = async (req, res) => {
    // lets have a error handling using try and catch.
    try {
        // arguments from the UI
        const { email, password } = req.body;
        // check if email and password are in unrequired format.
        if (!email?.trim() || !password?.trim()) {
            // returning the false status so that we are able to debug where this error comes from.
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // finding the user in the database also with the password
        const user = await authService.findUserByEmailWithPassword(email);

        // if the user is not there
        if (!user) {
            console.log("Login failed: invalid email format or email not registered");
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        // matching the passwords in the db
        const isMatch = await authService.comparePassword(password.trim(), user.password);
        // if doesnt match we failed the process.

        if (!isMatch) {
            console.log("Login failed: password mismatch");
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            });
        }
        // this signs token using the email and make it visible for 30 days
        const token = authService.generateLoginToken(user);

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

    catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

///// ================== USER DATA OR PROFILE ================
/**
 * getting the data of user to himself
*/
const getMe = async (req, res) => {
    try {
        const user = await authService.findUserByIdWithoutPassword(req.user.id || req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error " });
    }

};



//// ======================= GET USER BY ID =======================

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await authService.findUserByIdWithoutPassword(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found " });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


/// ====================== CHANGE PASSWORD =====================


const changePassword = async (req, res) => {
    try {
        const oldpassword = req.body.oldpassword ?? req.body.oldPassword;
        const newPassword = req.body.newPassword ?? req.body.newpassword;

        if (!oldpassword || !newPassword) {
            return res.status(400).json({ message: "All Fields are required." });
        }

        if (typeof oldpassword !== 'string') {
            return res.status(400).json({ message: "Invalid old password." });
        }

        if (typeof newPassword !== 'string') {
            return res.status(400).json({ message: "Invalid new password." });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized.' });
        }

        const result = await authService.changeUserPassword(req.user._id, oldpassword, newPassword);

        if (!result.success) {
            if (result.reason === 'not_found') {
                return res.status(404).json({ message: `User not found.` });
            }
            if (result.reason === 'wrong_password') {
                return res.status(400).json({ message: "Old Password is incorrect." });
            }
            if (result.reason === 'too_short') {
                return res.status(400).json({ message: 'Password must be at least 8 characters.' });
            }
        }

        res.json({ message: 'Password successfully changed.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error. Please try again.' });
    }
};


module.exports = {
    register,
    login,
    getMe,
    getUserById,
    changePassword,
};
