import React, { 
    useRef, 
    useState, 
    useCallback,
} from 'react'
import { useRouter } from "next/router"
import 'bootstrap/dist/css/bootstrap.min.css';
import EnrollQuestionPD from './enrollQuestionPD'
import RankingPD from './rankingPD';

function ScoreNav(props:any){
    const router = useRouter()
  const {
    facial_expression,
    attitude,
    voice_energy,
    //speaking_speed,
    voice_stability
  } = router.query;
    const handleSubmit = useCallback(() => {
        let username;
        username = prompt("名前を記入してください")

        const url = "https://inscodx.herokuapp.com/score"
        const config = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            score:20
          })
        }
        fetch(url, config)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
      }, [])
    
  return(
    <>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" ></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" ></script>
      </head>

      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">inscoDX</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                  <div 
                  className="nav-item"
                  onClick={props.handleSubmit}
                  >スコアの登録</div>
              </li>
            </ul>
            <li className="d-flex navber-Nav">
              <a className="nav-link active bg-dark text-white" role="button" href="https://github.com/ysdko/inscoDX">GitHub</a>
            </li>
          </div>
        </div>
      </nav>
    </>
  )
}

export default ScoreNav;