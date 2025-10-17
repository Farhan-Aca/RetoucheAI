import bcrypt from "bcrypt";
import {User} from "../mongoose/schemas/user.js";



export const register = async (req,res) => {

   const {username,email,password} = req.body;

   try {
    
   const hashedPassword = await bcrypt.hash(password, 6);
   console.log(hashedPassword);

    const newUser = new User({
            username,
            email,
            password: hashedPassword,
            });

    await newUser.save();


    console.log(newUser);

    res.status(201).json({message : "C est bien fonctionnel !"});
}catch(err){
    console.log(err);
    return  res.status(500).json({message:"Ca fonctionne pas !"});
}
}; 


export const login = async (req,res)=> {

    const { Username,password}=  req.body;
    
    try{
          
        const user = await User.findOne({ Username }).select('+password');


        if(!user) return res.status(401).json({message:"invalid credentials"})

        const isPasswordValid = await bcrypt.compare(password,user.password);
        
        if(!isPasswordValid) return res.status(401).json({message:"invalid credentials"});


        req.session.user = {
        id: user.id,
        username: user.username,
        email: user.email,
        };

        res.status(200).json({ message: "login réussi" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login" });
    }    
};



export const logout = (req,res)=> {
     req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Erreur de déconnexion" });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Déconnecté" });
  });
};