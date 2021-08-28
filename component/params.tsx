import React, {useEffect, useState, useRef} from "react";
import Image from "next/image";
import advice from "./advice";


function params(props:any){

  const evaluation:Array<string> = ["init", "GREAT", "GOOD", "BAD"];
  const evaluationAttitude:Array<string> = ["init", "GOOD", "BAD"];
  let text:string = "";
  let textAttitude:string = "";

  switch (props.faceImage.value) {
    case evaluation[0]:
      text = "笑顔で話そう！";
      break;
    case evaluation[1]:
      text = evaluation[1];
      break;
    case evaluation[2]:
      text = evaluation[2];
      break;
    case evaluation[3]:
      text = evaluation[3];
      break;
  } 

  switch (props.attitudeImage.value) {
    case evaluationAttitude[0]:
      textAttitude = "落ち着いて！";
      break;
    case evaluationAttitude[1]:
      textAttitude = evaluationAttitude[1];
      break;
    case evaluationAttitude[2]:
      textAttitude = evaluationAttitude[2];
      break;
  }

  return(
    <>
      <div className="card">
      <div className="row card-body">
        <div className="col-6 pt-1" style={{background: "#777"}}>
          <h4 className="text-center"> 表情 </h4>
          <p className="text-center">{text}</p>
          <Image src={props.faceImage.img} height={150} width={150}></Image>
        </div>
        <div className="col-6" style={{background: "#777"}}>
          <h4 className="text-center"> 姿勢 </h4>
          <p className="text-center">{textAttitude}</p>
          <Image src={props.attitudeImage.img} height={150} width={150}></Image>
        </div>
      </div>
      </div>
    </>
  )
}

export default params;