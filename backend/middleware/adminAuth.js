import jwt from 'jsonwebtoken';

const adminAuth = async (req,res,next) =>{
   
    try{
         let {token} = req.cookies

    if(!token) {
        return res.status(400).json({message:"Not Authorised Login Again"})
    }
    let verifyToken = jwt.verify(token,process.env.JWT_SECRET)

    if(!verifyToken){
        return res.status(400).json({message:"Not Authorised Login Again,inavlid token"})
    }
    req.adminEmail = process.env.ADMIN_EMAIL
    next()

    }catch(e){
        console.log(" adminAuth Error")
        return res.status(500).json({message:`adminAuth error${e}`})
    }
}

export default adminAuth;
