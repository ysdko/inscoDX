import type { NextPage } from 'next'
import Head from 'next/head'
import Score from "../../component/score";
import Chart from "../../component/chart";
import Discribe from '../../component/discribe';
import Report from '../../component/report';
import background from "background.gif"
import { useCallback, useState, useEffect } from 'react'; 
import ScoreNav from '../../component/scoreNav';
import { useRouter } from "next/router"

const vc = (value:number | string) => {
  switch(typeof(value)){
    case("string"):
      return 0

    case("undefined"):
      return 0
      
    default:
      return value
  }
}

const Home: NextPage = () => {
  const router = useRouter()
  const [username, setName] = useState("");
  const [score, setScore] = useState("72");

  const handleSubmit = useCallback(() => {
    let username = prompt("名前を記入してください")
    const url = "https://inscodx.herokuapp.com/score"
    const config = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        score
      })
    }
    fetch(url, config)
    .then(res => res.json())
    .then(data => {
      alert("登録完了しました！！")
    })
    .catch(err => console.log(err))
  }, [score])

  useEffect(() => {
    const rate_1 = 20;
    const rate_2 = 20;
    const rate_3 = 2/5;
    const rate_4 = 2/5;
    const rate_5 = 2/5;

    const [
      facial_expression,
      attitude,
      voice_energy,
      speaking_speed,
      voice_stability
    ] = Object.values(router.query)

    setScore(() => {
      return String(
        facial_expression * rate_1 +
        attitude          * rate_2 + 
        voice_energy      * rate_3 +
        speaking_speed    * rate_4 + 
        voice_stability   * rate_5
      )
    })
  }, [score]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="score-bg">
      <div className="container-fluid">
        <div className="row">
          <ScoreNav handleSubmit={handleSubmit} />
        </div>
      </div>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-5">
              <Score score={score}/>
            </div>
            <div className="col-5">
              <Chart query={router.query}/>
            </div>
          </div>
            <div className="row justify-content-center mt-2">
              <div className="col-5">
                <Discribe/>
              </div>
              <div className="col-5">
                <Report/>
              </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
