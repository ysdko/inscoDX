import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from './tab';
import EnrollQuestionPD from './enrollQuestionPD'
import RankingPD from './rankingPD';
import logo from "../public/insco_logo.png";
import Image from 'next/dist/client/image';

function navber(props:any){
  return(
    <>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
      </head>

      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Image src={logo} height={40} width={150}></Image>
          {/* <a className="navbar-brand">inscoDX</a> */}
          <button className="navbar-toggler btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Tab text={'質問内容の登録'} target={'#question'} />
              <Tab text={'ランキング'} target={'#rank'} />
            </ul>
            <li className="d-flex navber-Nav">
              <a className="nav-link active bg-dark text-white" role="button" href="https://github.com/ysdko/inscoDX">GitHub</a>
            </li>
          </div>
        </div>
      </nav>
        <EnrollQuestionPD text1={'質問を登録してください'} text2={'登録リスト'} questionsList={props.questionsList} addQuestion={props.addQuestion} deleteQuestion={props.deleteQuestion}/>
        <RankingPD />
    </>
  )
}

export default navber;