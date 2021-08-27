import React from "react";

function nowTime(props:any){

  return(
    <>
      <div className="card bg-blue h-50">
      <div className="card-body" >
      <h5 className="card-title text-center blue"></h5>
        <p className="card-text">音量上げて</p>
      </div>
      <div className="card-footer text-muted">
        何時何分
      </div>
      </div>
    </>
  )
}

export default nowTime;