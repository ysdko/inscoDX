import React from "react";

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
  }
        
  return(
    <>
      <div className="card bg-blue h-25">
      <div className="card-body">
      <h5 className="card-title text-center blue"></h5>
      <button type="button" onClick={setFunc}>{text}</button>
      </div>
      </div>
    </>
  )
}

export default nowTime;