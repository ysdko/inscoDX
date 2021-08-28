import React from "react";

function titleText(props:any){

  const initialList:Array<string> = ["質問内容を登録してください", "STARTボタンで開始します"];
  let titleText:string;
  
  if(!props.startFlag){
    titleText = initialList[props.nowIndex.current[0]];
  }
  else
    titleText = props.titleQuestion;
        
  return(
    <>
      <h2 className="text-center">{titleText}</h2>
    </>
  )
}

export default titleText;