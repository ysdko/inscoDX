import React from "react";

function questionList(props:any) {
  const preDeleteQuestion = () => props.deleteQuestion(props.question);

  return(
    <li key={props.key}>{props.question}<button className="btn btn-secondary" onClick={preDeleteQuestion}>削除</button></li>
    )
}

export default questionList;