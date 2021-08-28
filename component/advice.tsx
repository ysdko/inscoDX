import React from "react";

function advice(props:any){

  return(
    <>
      <div className="card">
      <div className="card-body">
      <h4 className="card-title text-center">アドバイス欄</h4>
      {/* <ul>
        {props.advicesList.current.map((advice:string, index:number) => <li className="text-center" key={index}>{advice}</li>)}
      </ul> */}
      <div className="card card-body border border-2 pt-2 pb-1 const">
        <p className="text-center balloon1-left mt-2">声を大きくしよう</p>
        <p className="text-center balloon1-left mt-1">声を大きくしよう</p>
        <p className="text-center balloon1-left mt-1">声を大きくしよう</p>
        {/* {props.advicesList.current.map((advice:string, index:number) => <li className="text-center" key={index}>{advice}</li>)} */}
      </div>
      </div>
      </div>
    </>
  )
}

export default advice;