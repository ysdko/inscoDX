import React from "react";

function point(props:any){

  let sign:string;
  let value:number;
  var n = 1;	// 小数点第n位まで残す
  const mathFunc = (v:number, n:number) => Math.floor(v * Math.pow(10, n)) / Math.pow(10, n);

  if (props.point.current >= 0){
    sign = "+ ";
    value = mathFunc(props.point.current, n);
  }
  else{
    sign = "- ";
    value = - mathFunc(props.point.current, n);
  }

  let percent = 50 + Math.floor((value / 10) * 50);

  return(
    <>
      <div className="card text-center">
        <div className="card-body mt-1">
          <h4 className="mb-3"> 加点・減点 </h4>
          <h1 className="mb-3"> {sign + value.toString() + " 点"} </h1>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} style={{width: percent + "%"}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default point;