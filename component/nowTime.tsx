import React from 'react'
import { 
    useEffect,
    useState,
} from 'react';

const arrangeNumber = (num:number): string => {
    return num > 9 ? `${num}` : `0${num}`
}

const NowTime = (props:any) => {
  const [second, setSecond] = useState(0);
  // const [start, setStart] = useState(false)// 消してほしいとこ

  useEffect(() => {
    const interval = setInterval(() => {
      if(props.startFlag){// 書き換えてほしい
        setSecond(s => s + 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [props.startFlag]);// 書き換えてほしい
    return (
        <>
            <div className="card text-center">
              <div className="card-body mt-1">
                <h4> 経過時間 </h4>
                {
                  props.startFlag// 書き換えてほしい
                  ?　<h1>{`${arrangeNumber(Math.floor(second/60))}:${arrangeNumber(second%60)}`}</h1>
                  :　<h1>{"00:00"}</h1>
                }
              </div>
            </div>
        </>
    )
}

export default NowTime
