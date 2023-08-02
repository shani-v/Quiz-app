import React, { useState } from 'react'
import { useEffect } from 'react'

function App() {
  const [allQuestions, setAllQuestion] = useState([])
  const [currentQus, setCurrentQus] = useState(0)
  const [clickElement, setClickElement] = useState('')
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [isNext, setIsNext] = useState(false)

  let API = 'https://opentdb.com/api.php?amount=10&category=9&type=multiple'
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
      setIsNext(false)
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
      <div className='flex justify-center items-center bg-cyan-500 min-h-screen'>
        <div>
          {showResult ? (
            <div className='bg-white rounded-md mx-5 md:mx-0'>
              <h1 className='pt-10 text-center underline text-black text-xl font-bold'>
                QUIZ APP
              </h1>

              <div className='pt-10 mx-4'>
                <h1 className='capitalize font-semibold text-lg border p-2 w-60 text-center shadow rounded'>
                  total Question :- <span>{allQuestions.length}</span>
                </h1>
                <h1 className='capitalize font-semibold text-lg border p-2 text-center mt-4 shadow rounded'>
                  your Answer :-<span className='ml-2'>{score}</span>
                </h1>
              </div>
              <div className='flex justify-center py-10'>
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
          ) : (
            <div className='bg-white rounded-md mx-5 md:mx-0'>
              <h1 className='uppercase text-center pt-5 text-black text-xl font-bold'>
                Quiz App
              </h1>
              <div className='flex gap-1 p-2 m-5'>
                <h1 className='font-bold'>{currentQus + 1}.</h1>

                <p className='font-semibold max-w-md'>
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
                      className={`flex justify-center flex-wrap mx-5 mb-3 border shadow rounded hover:bg-emerald-500 hover:cursor-pointer ${
                        clickElement === i + 1 ? 'bg-emerald-500' : null
                      }`}
                    >
                      <h1 className='text-center py-4'>{element}</h1>
                    </div>
                  </>
                )
              })}

              <div className='flex justify-center items-center py-5'>
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
      </div>
    </>
  )
}

export default App
