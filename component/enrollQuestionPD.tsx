import React, {useRef} from "react";
import QuestionList from './questionList';

function enrollQuestion(props:any){

  const refInput = useRef<any>(null);
  const preAddQuestion = () => {
    const nowQuestion = refInput.current.value;
    props.addQuestion(nowQuestion);
    refInput.current.value='';
  }
  
  return(
    <div className="collapse" id="question">
      <div className="card card-body">
        <div className="mb-2">
          <div className="container">
            <div className="row">
              <h4 for="exampleFormControlInput1" className="form-label mb-3">{props.text1}</h4>
            </div>
            <div className="row">
              <div className="col-10">
                <input type="text" ref={refInput} className="form-control" id="exampleFormControlInput1" placeholder="" />
              </div>
              <button className="col-2 btn btn-primary" onClick={preAddQuestion}>登録</button>
            </div>
            <h4 className="my-3">{props.text2}</h4>
            <div className="card card-body mt-2">
            <ol className="col-8">
              {props.questionsList.map((question:string, i:number) => <QuestionList key={i} question={question} deleteQuestion={props.deleteQuestion} />)}
            </ol>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default enrollQuestion;