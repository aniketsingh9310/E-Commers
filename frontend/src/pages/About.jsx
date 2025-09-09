import React from 'react'
import Title from '../components/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../components/NewLetterBox'

const About = () => {
  return (
    <div className='w-[99vw] md:-[100vw] min-h-[100vh] flex items-center justify-center flex-col 
    bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px]'>
        <Title text1={'ABOUT'} text2={'US'} />
        <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>
            <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
                <img src={about} alt="" className='lg:w-[65%] w-[80%] shadow-md shadow-white
                rounded-sm' />
            </div>
            <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
                <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
                  OneCart born for smart, seamless shopping-created to delierver wuality products, trending
                  styles, and everday esentials in one place. with reliable service. fast delievery, and great value
                  ,OneCart makes your oinline shopping experience simple, satisfying,and stress-free
                </p>
                 <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
                  OneCart born for smart, seamless shopping-created to delierver wuality products, trending
                  styles, and everday esentials in one place. with reliable service. fast delievery, and great value
                  ,OneCart makes your oinline shopping experience simple, satisfying,and stress-free
                </p>
                <p className='lg:w-[80%] w-[100%] text-[15px] text-[white] lg:text-[18px] mt-[10px] font-bold'>
                Our Mission</p>
               <p className='lg:w-[80%] w-[100%] text-[white] md:text-[16px] text-[13px]'>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sunt maiores commodi vitae expedita
                    obcaecati praesentium doloremque enim modi? Adipisci iusto soluta tempora quas. Nemo quis cumque nobis 
                    saepe iure deserunt animi eligendi obcaecati. Ullam.</p>
            </div>
        </div>
        <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
          <div className='w-[80%] flex items-center justify-center lg:flex-row flex-col py-[40px]'>

              <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex
              items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] 
              backdrop-blur-[2px] bg-[#ffffff0b]'>
                  <b className='text-[20px] font-semibold text-[#bff1f9]'>
                      Quality Assurance</b>
                      <p>We guarantee quality through strict checks, reliable sourcing, and a commitment
                      to customer satisfaction always.</p>
              </div>

              <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex
              items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] 
              backdrop-blur-[2px] bg-[#ffffff0b]'>
                  <b className='text-[20px] font-semibold text-[#bff1f9]'>
                      Convenience</b>
                      <p>Show easily with fast delievery simple navigation, secure checkout,and everything
                      you need in one place</p>
              </div>

              <div className='lg:w-[33%] w-[90%] h-[250px] border-[1px] border-gray-100 flex
              items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-[white] 
              backdrop-blur-[2px] bg-[#ffffff0b]'>
                  <b className='text-[20px] font-semibold text-[#bff1f9]'>
                      Exceptional Customer Service</b>
                      <p>Our dedication support team ensures quick response,hellpful solution, and a 
                      smooth shopping expensive every time.</p>
              </div>
          </div>
        </div>
        <NewLetterBox/>
    </div>
  )
}

export default About


