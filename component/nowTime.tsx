import React from 'react'
import { 
    useEffect,
    useState,
} from 'react';

const arrangeNumber = (num:number): string => {
    return num > 9 ? `${num}` : `0${num}`
}

const NowTime = () => {
  const [second, setSecond] = useState(0)
  const [start, setStart] = useState(false)// 消してほしいとこ

  useEffect(() => {
    const interval = setInterval(() => {
      if(start){// 書き換えてほしい
        setSecond(s => s + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [start]);// 書き換えてほしい
    return (
        <>
            <div className="card text-center">
              <div className="card-body ">
                {
                  start// 書き換えてほしい
                  ?  <h2>{`${arrangeNumber(Math.floor(second/60))}:${arrangeNumber(second%60)}`}</h2>
                  : <button className="btn btn-light btn-lg" onClick={() => setStart(true)}>start</button>      
                }
              </div>
            </div>
        </>
    )
}

export default NowTime
