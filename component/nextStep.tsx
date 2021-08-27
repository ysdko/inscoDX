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
      <div className="card bg-blue h-25">
      <div className="card-body">
      <h5 className="card-title text-center blue"></h5>
      {props.endFlag
        ? <Link href={{ pathname: '/posts/score', query: { face: props.resultParams.current[0][0] } }}><button type="button" onClick={setFunc}>{text}</button></Link>
        : <button type="button" onClick={setFunc}>{text}</button>
      }
      </div>
      </div>
    </>
  )
}

export default nowTime;