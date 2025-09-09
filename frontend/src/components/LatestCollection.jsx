import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

const LatestCollection = () => {

    let {products} = useContext(shopDataContext)
    
    const [latestProducts,setLatestProducts] = useState([])

    useEffect(()=>{
        setLatestProducts(products.slice(0,8))
    },[products])

  return (
    <div>
      <div className='h-[8%] w-[100%] text-center md:mt-[50px]'>
        <Title text1={"LATEST"} text2={"COLLECTION"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
        Step Into Style - New Collection Dropping This Season !</p>
      </div>
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {
            latestProducts.map((items,index)=>(
                <Card key={index} name={items.name} image={items.image1} 
                    id={items._id} price={items.price}
                />
            ))
        }

      </div>
    </div>
  )
}

export default LatestCollection