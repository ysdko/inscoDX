import React from "react";

function nowTime(props:any){

  return(
    <>
      <div className="card text-center">
        <div className="card-body mt-1">
          <h4> 声量 </h4>
          <div className="progress mt-4">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width:"75%"}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default nowTime;