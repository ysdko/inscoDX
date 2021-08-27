import React, {useEffect, useState, useRef} from "react";
import Image from "next/image";

import advice from "./advice";


function params(props:any){
  return(
    <>
      <div className="card bg-blue h-50">
      <div className="row card-body h-25">
        <div className="col-6">
        <span className="border-bottom border-right ">
          <h5 className="text-center"> 表情 </h5>
          <Image src={props.faceImage} height={150} width={150}></Image>
        </span>
        </div>
        <div className="col-6">
          <h5 className="text-center"> 姿勢 </h5>
          //<Image src={props.shakeImage} height={150} width={150}></Image>
        </div>
      </div>
      <div className="card-footer text-muted">
        何時何分
      </div>
      </div>
    </>
  )
}

export default params;