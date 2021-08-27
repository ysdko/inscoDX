import React from "react";

function questionList(props:any) {
  const preDeleteQuestion = () => props.deleteQuestion(props.question);

  return(
    <li key={props.key}>{props.question}<button onClick={preDeleteQuestion}>削除</button></li>
    )
}

export default questionList;