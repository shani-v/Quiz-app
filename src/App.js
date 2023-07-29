import React, { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [allQuestions, setAllQuestion] = useState([])
  const [currentQus, setCurrentQus] = useState(0)
  const [clickElement, setClickElement] = useState('')
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isNext, setIsNext] = useState(false)

  let API = 'https://opentdb.com/api.php?amount=50&category=9&type=multiple'
  const fetchApiData = async (url) => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      const allQuestion = data.results.map((el) => {
        const option = [...el.incorrect_answers]
        option.splice(option.length * Math.random(), 0, el.correct_answer)
        el.options = option
        return el
      })
      setAllQuestion(allQuestion)
    } catch (err) {
      console.log(err)
    }
  }
  const updateScore = function (element, i) {
    if (element === allQuestions[currentQus].correct_answer) {
      setScore(score + 1)
    }
  }
  const changeQuestion = () => {
    if (currentQus < allQuestions.length - 1) {
      setCurrentQus(currentQus + 1)
      setClickElement(0)
    } else {
      setShowResult(true)
    }
  }

  const resetAll = () => {
    setShowResult(false)
    setCurrentQus(0)
    setClickElement(0)
    setScore(0)
  }

  useEffect(() => {
    fetchApiData(API)
  }, [])

  return (
    <>
      <div className='flex justify-center items-center bg-cyan-500 h-screen w-full'>
        {showResult ? (
          <div className='flex justify-center items-center h-[500px] w-[40%] bg-white rounded-md '>
            <div className='max-w-full p-2'>
              <h1 className='text-center  mb-16 underline text-black text-3xl font-bold'>
                QUIZ APP
              </h1>
              <h1 className='font-bold text-2xl border-2 border-red-500 p-2 w-80 md: max-w-full text-center bg-emerald-300 '>
                total score :- <span>{allQuestions.length}</span>
              </h1>
              <h1 className='font-bold text-2xl border-2 border-red-500 p-2 max-w-full text-center mt-4 bg-emerald-300 '>
                your score :-<span className='ml-2'>{score}</span>
              </h1>
              <div className='flex justify-center mt-10'>
                <button
                  onClick={() => {
                    resetAll()
                  }}
                  className='bg-cyan-300 h-10 w-40 font-bold rounded-md hover:bg-cyan-500'
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className='max-h-max w-[40%] bg-white rounded-md '>
            <h1 className='text-center mt-5 underline text-black text-2xl font-bold'>
              QUIZ APP
            </h1>
            <div className='flex  items-center border-2 break-all border-gray-200 gap-2 max-h-min p-2 max-w-full mx-5 mt-5 shadow-lg'>
              <h1 className=' font-bold text-2xl  '>{currentQus + 1}.</h1>

              <p className=' font-bold text-xl text-justify'>
                {allQuestions[currentQus]?.question}
              </p>
            </div>

            {allQuestions[currentQus]?.options?.map((element, i) => {
              return (
                <>
                  <div
                    key={i}
                    onClick={() => {
                      updateScore(element, i)
                      setClickElement(i + 1)
                      setIsNext(true)
                    }}
                    className={` h-16 max-w-full mx-5 mt-5  border-2 border-red-400 hover:bg-emerald-500 hover:cursor-pointer ${
                      clickElement === i + 1 ? 'bg-emerald-500' : null
                    }`}
                  >
                    <h1 className='flex flex-wrap justify-center mt-5 font-semibold text-xl '>
                      {element}
                    </h1>
                  </div>
                </>
              )
            })}

            <div className='flex justify-center items-center  mt-10 '>
              <button
                className='bg-cyan-300 h-10 w-40 font-bold rounded-md m-4  hover:bg-cyan-500'
                onClick={() => {
                  if (isNext) {
                    changeQuestion()
                  }
                }}
              >
                NEXT
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
