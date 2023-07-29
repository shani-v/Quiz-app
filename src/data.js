import React, { useState } from 'react'
import { useEffect } from 'react'

function Data() {
  const [data, setData] = useState()
  const [options, setOptions] = useState()
  let API = 'https://opentdb.com/api.php?amount=1&category=9&type=multiple'

  useEffect(() => {
    const fetchApiData = async (url) => {
      try {
        const res = await fetch(url)
        const data = await res.json()
        setData(data.results)
      } catch (err) {
        console.log(err)
      }
    }
    fetchApiData(API)
  }, [API])

  // useEffect(() => {
  //   function objectData() {
  //     if (data) {
  //       // setObjectValue(Object.keys(data))
  //       setObjectValue(Object.values(data))
  //     } else {
  //       console.log('object')
  //     }
  //   }
  //   objectData()
  // }, [data])
  // console.log(data)
  return (
    <>
      <div className='flex justify-center items-center bg-cyan-500 h-screen w-full'>
        <div className='h-[600px] w-[40%] bg-white rounded-md '>
          <h1 className='text-center mt-5 underline text-black text-2xl font-bold'>
            QUIZ APP
          </h1>
          <div className='flex justify-center items-center border-2 border-gray-200 gap-2 h-24 max-w-full mx-5 mt-5 shadow-lg'>
            <h1 className=' font-semibold text-xl'>1</h1>
            <p className=' font-bold text-xl'>What is computer ?</p>
          </div>
          <div className=' h-16 max-w-full mx-5 mt-5  border-2 border-red-400'>
            <h1 className='text-center mt-5 font-semibold text-xl'>
              {data?.map((ele) => {
                return (
                  <>
                    <div>{console.log(ele)}</div>
                    <div>
                      <p className=' h-16 max-w-full mx-5 mt-5  border-2 border-red-400'>
                        {ele.correct_answer}
                      </p>
                      {ele?.incorrect_answers?.map((element) => {
                        return (
                          <>
                            <div className=' h-16 max-w-full mx-5 mt-5  border-2 border-red-400'>
                              {element}
                            </div>
                          </>
                        )
                      })}
                    </div>
                  </>
                )
              })}
            </h1>
          </div>

          {/*           
          {/* <div className=' h-16 max-w-full mx-5 mt-5  border-2 border-red-400'>
            <h1 className='text-center mt-5 font-semibold text-xl'>hello</h1>
          </div>
          <div className=' h-16 max-w-full mx-5 mt-5  border-2 border-red-400'>
            <h1 className='text-center mt-5 font-semibold text-xl'>hello</h1>
          </div>
          <div className=' h-16 max-w-full mx-5 mt-5  border-2 border-red-400'>
            <h1 className='text-center mt-5 font-semibold text-xl'>hello</h1>
          </div> */}
          <div className='flex justify-center items-center  mt-10  '>
            <button className='bg-cyan-300 h-10 w-20 font-semibold rounded-md'>
              NEXT
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Data
