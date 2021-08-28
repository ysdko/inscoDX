import React from "react";

function nowTime(props:any){

  const nowProcess = Math.floor(100 * (props.nowIndex.current[1]) / props.questionsList.length);

  return(
    <>
      <div className="card text-center">
        <div className="card-body mt-1">
          <h4> 進捗状況 </h4>
          <div className="progress mt-4">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow={nowProcess} aria-valuemin={0} aria-valuemax={100} style={{width: nowProcess.toString() + "%"}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default nowTime;