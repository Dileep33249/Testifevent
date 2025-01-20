import User from "../model/model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
const key = "45678909876545678765434yuiukyjhtgrfdsghjkjhgfdzsdxcvbn"

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    // console.log(req.body);
    try {
        const user = await User.findOne({ email });
        // console.log(user);
        if (user) {
            return res.status(200).json({ message: "User already Exist" });
        }
    
        const hashpassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
            name,
            email,
            password: hashpassword,
            role
        })
    
        newUser.save();
    
        res.status(201).json({ message: "User Created Successfully" })
        
    } catch (error) {
        return res.status(500).json({ message:error.message})
        
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect Password" });
    }

    jwt.sign({ id: user.id },key,{expiresIn:'5h'},(error,token)=>{
        if(error){
            res.status(500).json({ message: "Server Error" })
        }
     res.cookie('token',token,{
        httpOnly:true
     })
     res.json({ message: "Logged in Successfully" })
    })


}