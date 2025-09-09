import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { authDataContext } from '../context/AuthContex'
import axios from 'axios'

const Lists = () => {
  const [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (e) {
      console.log(e)
    }
  }
  const removeList = async(id) =>{
    try{
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`,{},{withCredentials:true})

      if(result.data){
        fetchList()
      }else{
        console.log("failed to remove product")
      }
    }catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='w-[95vw] md:w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />
      <div className='w-[100%] h-[100%] flex items-center justify-start'>
        <Sidebar />
      </div>

      <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>
        <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] mb-[20px] text-white'>
          All Listed Products
        </div>

        {list && list.length > 0 ? (
          list.map((items, index) => (
            <div
              key={index}
              className='w-[90%] md:h-[150px] h-auto bg-slate-600 rounded-xl flex items-center gap-[15px] p-[10px] md:px-[30px] overflow-x-auto'>
              <img src={items.image1} className='w-[30%] md:w-[120px] h-[90%] rounded-lg ' alt="" />
              <div className='w-[90%] h-[80%] flex flex-col items-start justify-center gap-[2px]'>
                <div className='w-[100%] md:text-[20px] text-[15px] text-[#bef0f3]'>{items.name}</div>

                <div className='md:text-[17px] text-[15px] text-[#bef3da]'>{items.category}</div>
                <div className='md:text-[17px] text-[15px] text-[#bef3da]'>₹ {items.price}</div>
              </div>
              <div className='w-[10%] h-[100%] bg-transparent flex items-center justify-center'>
                  <span className='w-[35px] h-[30%] flex items-center justify-center rounded-md
                   md:hover:bg-red-300 md:hover:text-black cursor-pointer' onClick={()=>removeList(items._id)}>X</span>
              </div>
            </div>
          ))
        ) : (
          <div className='text-white text-lg'>No Products available</div> 
        )}
      </div>
    </div>
  )
}

export default Lists
