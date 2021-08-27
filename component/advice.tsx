import React from "react";

function advice(props:any){

  return(
    <>
      <div className="card bg-blue h-50">
      <div className="card-body">
      <h5 className="card-title text-center blue">Advice出すよ！</h5>
      <ul>
        {props.advicesList.current.map((advice:string, index:number) => <li className="text-center" key={index}>{advice}</li>)}
      </ul>
      </div>
      <div className="card-footer text-muted">
        何時何分
      </div>
      </div>
    </>
  )
}

export default advice;