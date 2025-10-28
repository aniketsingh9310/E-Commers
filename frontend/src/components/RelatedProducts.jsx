import React, { useContext, useEffect, useState } from 'react'
import { ShopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

const RelatedProducts = ({category,subCategory,currentProductId}) => {

    let {products} = useContext(ShopDataContext)
    let [related,setRelated] = useState([])

    useEffect(()=>{
        let productsCopy = products.slice()
       productsCopy = productsCopy.filter(
        (items) => items.category?.trim().toLowerCase() === category?.trim().toLowerCase()
        )
        productsCopy = productsCopy.filter((items)=>subCategory === 
         items.subCategory)
         productsCopy = productsCopy.filter((items)=>currentProductId
        !== items._id)
        setRelated(productsCopy.slice(0,4))
    },[products,category,subCategory,currentProductId])

  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>
        <div className='ml-[20px] lg:ml-[80px]'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='w-[100%] mt-[30px] flex items-center justify-center
        flex-wrap gap-[50px]'>
            {
                related.map((items,index)=>(
                    <Card key={index} id={items._id} name={items.name} price={items.price}
                        image={items.image1}
                    />
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProducts