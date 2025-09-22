import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContex'
import axios from 'axios'
import { userDataContext } from './UserContext'
import { toast } from 'react-hot-toast'


export const  ShopDataContext = createContext()
const ShopContext = ({children}) => {
    
    const [products,setProducts] = useState([])
    const [showSearch,setShowSeacrh] = useState(false)
    const [search,setSearch] = useState("")
    const [cartItem,setCartItem] = useState({})
    let {serverUrl} = useContext(authDataContext)
    let {userData} = useContext(userDataContext)
    let currency = "₹"
    let delievery_fee = 40;

    const getProduct = async() =>{
        try{
            let result = await axios.get(serverUrl + "/api/product/list")
            console.log(result.data)
            setProducts(result.data)
        }catch(e){
            console.log(e)
        }
    }

   const addtoCart = async (itemId, size) => {
    if (!size) {
        console.log("Select product size");
        return;
    }

    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1; 
        } else {
            cartData[itemId][size] = 1;    
        }
    } else {
        cartData[itemId] = {};            
        cartData[itemId][size] = 1;
    }

     

    setCartItem(cartData);
   console.log(cartData)

   if(userData){
    try{
        let result = await axios.post(serverUrl + "/api/cart/add",
            {itemId,size}, {withCredentials:true})
            console.log(result.data)
    }catch(e){
        console.log(e)
    }
   }
};

    const getUserCart = async () =>{
        try{
            const result = await axios.post(serverUrl + '/api/cart/get',{},
                {withCredentials:true})

                setCartItem(result.data)
        }catch(e){
            console.log(e)
            toast.error(e.message)
        }
    } 

  const updateQuantity =async (itemId, size, quantity ) =>{
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity
        setCartItem(cartData)
       
        if(userData){
            try{
                await axios.post(serverUrl + "/api/cart/update",{itemId, size, quantity},
                    {withCredentials:true})
            }catch(e){
                console.log(e)
                toast.error(e.message)
            }
        }
    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItem) {
            for(const item in cartItem[items]){
                try{
                    if(cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                }catch(e){
                    console.log(e)
                }
            }
        }
        return totalCount;
    }

   const getCartAmount = () => {
    let totalAmount = 0;

    for (const items in cartItem) {
        
        let itemInfo = products.find(product => product._id === items);
        if (!itemInfo) continue;

        for (const size in cartItem[items]) {
            try {
                if (cartItem[items][size] > 0) {
                    totalAmount += itemInfo.price * cartItem[items][size];
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    return totalAmount;
}


    useEffect(()=>{
        getProduct()
    },[])

    useEffect(()=>{
        getUserCart()
    },[])

    let value = {
        products,currency,delievery_fee,getProduct,showSearch,setShowSeacrh,
        search,setSearch,cartItem,setCartItem,addtoCart,getCartCount,updateQuantity,getCartAmount
    }

  return (
        <ShopDataContext.Provider value={value}>
            {children}
        </ShopDataContext.Provider>
  )
}

export default ShopContext
