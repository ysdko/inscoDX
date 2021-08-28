import React from "react";
import Link from 'next/link'

function nowTime(props:any){

  let text:string;
  let setFunc;

  if(!props.startFlag){
    text = "START";
    setFunc = props.setStartFlag;
  }
  else if(!props.endFlag){
    text = "NEXT";
    setFunc = props.indexProceed;
  }
  else{ 
    text = "END";
    setFunc = props.recordEnd;
  }
        
  return(
    <>
      <div className="card text-center mt-2">
        
          {props.endFlag
            ? <Link href={ { pathname: '/posts/score', query: { face: props.resultParams.current[0][0] } }}><button type="button" className="btn btn-danger btn-lg btn-block" onClick={setFunc}>{text}</button></Link>
            : <button type="button" className="btn btn-danger btn-lg btn-block" onClick={setFunc}>{text}</button>
          }
        
      </div>
    </>
  )
}

export default nowTime;