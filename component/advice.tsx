import React from "react";

function advice(props:any){

  return(
    <>
      <div className="card">
      <div className="card-body" style={{background: "#777"}}>
      <h4 className="card-title text-center">アドバイス欄</h4>
      {/* <ul>
        {props.advicesList.current.map((advice:string, index:number) => <li className="text-center" key={index}>{advice}</li>)}
      </ul> */}
      <div className="card card-body border border-3 mt-2 pb-0 const" style={{background: "#e5f1ff", height: "215px"}}>
        {/* <p className="text-center balloon1-right mt-1">声を大きくしよう</p>
        <p className="text-center balloon1-right mt-1">声を大きくしよう</p>
        <p className="text-center balloon1-right mt-1">声を大きくしよう</p> */}
        {props.advicesList.current.map((advice:string, index:number) => <p className="text-center balloon1-right mt-1" key={index}>{advice}</p>)}
      </div>
      </div>
      </div>
    </>
  )
}

export default advice;