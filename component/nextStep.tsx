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

  let face_expression:any;
  let attitude:any;
  let voise_energy:any;
  let speaking_speed:any;
  let voise_stability:any;

  if (props.endFlag){
    face_expression = props.resultParams.current[0][0] / props.resultParams.current[0][1];
    attitude = props.resultParams.current[1][0];
    voise_energy = props.resultParams.current[2][0] / props.resultParams.current[2][1];
    speaking_speed = props.resultParams.current[3][0] / props.resultParams.current[3][1];
    voise_stability = props.resultParams.current[4][0] / props.resultParams.current[4][1];
  }
        
  return(
    <>
      <div className="card text-center mt-3">
        
          {props.endFlag
            ? <Link href={ { pathname: '/posts/score', 
            query: { face_expression: face_expression.toString(), attitude: attitude.toString(), voise_energy:voise_energy.toString(), speaking_speed:speaking_speed.toString(), voise_stability: voise_stability.toString()} }}>
              <button type="button" className="btn btn-danger btn-lg btn-block" onClick={setFunc}>{text}</button></Link>
            : <button type="button" className="btn btn-danger btn-lg btn-block" onClick={setFunc}>{text}</button>
          }
        
      </div>
    </>
  )
}

export default nowTime;