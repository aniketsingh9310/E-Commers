import User from '../model/userModel.js'

export const getCurrentUser = async (req,res) => {
    try {
        let user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"user is not found"});
        }
        return res.status(200).json(user);
    } catch(e) {
        console.log("getCurrentUser Error", e);
        return res.status(500).json({message:`getCurrentUser error ${e}`});
    }
}


export const getAdmin = async (req,res) =>{
    try{
        let adminEmail = req.adminEmail;
        if(!adminEmail){
            return res.status(404).json({message:"Admin is not found"})
        }
        return res.status(201).json({
            email:adminEmail,
            role:"admin"
        })

    }catch(e){
         console.log(" adminEmail Error")
        return res.status(500).json({message:`adminEmail error${e}`})
    }
}