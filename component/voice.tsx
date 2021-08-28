import React from "react";

function nowTime(props:any){

  let energy = props.energy;
  let calm = props.calm;

  energy += 25;
  calm += 25;

  return(
    <>
      <div className="card text-center">
        <div className="card-body mt-2">
          <h5> 声の明るさ </h5>
          <div className="progress pt-2 mt-3">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow={Math.floor(energy)} aria-valuemin={0} aria-valuemax={50} style={{width: energy.toString() + "%"}}></div>
          </div>
          <h5 className="mt-4"> 声の安定性 </h5>
          <div className="progress pt-1 mt-3 mb-2">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" aria-valuenow={Math.floor(energy)} aria-valuemin={0} aria-valuemax={50} style={{width: calm.toString() + "%"}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default nowTime;