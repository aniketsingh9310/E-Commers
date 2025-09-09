import User from "../model/userModel.js"

export const addToCart = async (req,res) => {
    try{
        const {itemId, size} = req.body;
         
        const userData = await User.findById(req.userId)

        if(!userData){
            return res.status(404).json({message:"user not found"})
        }

        let cartData = userData.cartData || {}

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }
        await User.findByIdAndUpdate(req.userId,{cartData});

        return res.status(201).json({message:"Added to Cart"})
    }catch(e){
        console.log(e)
        return res.status(500).json({message:"addtocart error"})
    }
} 

export const updateCart = async (req,res) =>{
    try{
        const {itemId, size, quantity} = req.body;
        const userData = await User.findById(req.userId);
        let cartData = userData.cartData || {};

        if (quantity > 0) {
            
            if (!cartData[itemId]) cartData[itemId] = {};
            cartData[itemId][size] = quantity;
        } else {
          
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size];

               
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }
        }

        await User.findByIdAndUpdate(req.userId, { cartData });
        return res.status(201).json({ message:"Cart Updated", cartData });
    }catch(e){
        console.log(e)
        return res.status(500).json({ message:"updatedCart error" })
    }
}


export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "Cart not found" });
    }

    let cartData = userData.cartData || {};
    return res.status(200).json(cartData);

  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "getUserCart error" });
  }
};
