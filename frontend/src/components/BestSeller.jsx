import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

const BestSeller = () => {
    let {products} = useContext(ShopDataContext)
    const [bestSeller,setBestSeller] = useState([])

    useEffect(()=>{
        let filterProduct = products.filter((items)=>items.bestseller)

        setBestSeller(filterProduct.slice(0,4))
    },[products])
  return (
    <div>
      <div className='h-[8%] w-[100%] text-center mt-[50px]'>
        <Title text1 = {"BEST"} text2={"SELLER"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] 
        text-blue-100'>Tried, Tested, Loved Discover Our All- Time Best Sellers.</p>
        </div>
        <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
            {
              bestSeller.map((items,index)=>(
                <Card key={index} name={items.name} id={items._id} image={items.image1} price={items.price}/>
              ))  
            }
        </div>
    </div>
  )
}

export default BestSeller