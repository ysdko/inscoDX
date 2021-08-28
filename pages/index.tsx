import Head from 'next/head';
import * as faceapi from "face-api.js";
import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../component/navbar';
import Advice from '../component/advice';
import Params from "../component/params";
import NowTime from "../component/nowTime";
import Process from "../component/process";
import NextStep from "../component/nextStep";
import great from "../public/great.svg";
import good from "../public/good.svg";
import goodAttitude from "../public/goodAttitude.svg";
import badAttitude from "../public/badAttitude.svg";
import bad from "../public/bad.svg";
import TitleText from "../component/title";
import Point from "../component/point";
import Voice from "../component/voice";
import Image from "next/image";
import { parseJSON } from 'jquery';
//import { start } from '@popperjs/core';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';



function Capture() {
  // ナビゲーションバー関連
  const [questionsList, enrollQuestion] = useState<Array<string>>([]);
  const addQuestion = (nowQuestion : string) => enrollQuestion([...questionsList, nowQuestion]);
  const deleteQuestion = (question : string) => {
    const newQuestionsList = questionsList.slice();
    const index = newQuestionsList.indexOf(question);
    newQuestionsList.splice(index, 1);
    enrollQuestion(newQuestionsList);
  }
  const [startFlag, setStart] = useState(false);
  const [endFlag, setEnd] = useState(false);
  const [titleQuestion, setTitleQuestion] = useState<string>("");
  const nowIndex = useRef([0, 0]);
  const faceApiFlag = useRef<boolean>(false);
  const sumAttitude = useRef(0);
  if(sumAttitude.current > 1) sumAttitude.current = 1;
  const resultParams = useRef<Array<Array<number>>>([[0.5, 0], [0, 0], [25, 0], [25, 0], [25, 0]]);
  const setStartFlag = () => {
    setStart(true);
    setTitleQuestion(questionsList[nowIndex.current[1]]);
    faceApiFlag.current = true;
    if(nowIndex.current[1] === questionsList.length - 1)
      setEndFlag();
    handleStart();
  }
  const setEndFlag = () => {
    setEnd(true);
  }
  const indexProceed = () => {
    nowIndex.current[1] += 1;
    setTitleQuestion(questionsList[nowIndex.current[1]]);
    if(nowIndex.current[1] === questionsList.length - 1)
      setEndFlag();
  }
  if(startFlag !== true){
    if(questionsList.length === 0)
      nowIndex.current[0] = 0;
    else
      nowIndex.current[0] = 1;
  }

  // カメラ関連
  const webcamRef = useRef<Webcam>(null);
  const initScores = {
    angry: 0,
    disgusted: 0,
    fearful: 0,
    happy: 0,
    neutral: 1,
    sad: 0,
    surprised: 0,
  }
  const point = useRef(0);
  const [scores, updateScores] = useState(initScores);
  const adviceGiveCounter = useRef<number>(0);
  const faceImage = useRef<object>({value:"init", img:good});
  const setAdvice = (nextScores:any) => {
    if (nextScores.sad >  0.2){
      faceImage.current = {value:"BAD", img:bad};
      point.current -= 0.05;

    }
    else if (nextScores.happy > 0.3){
      faceImage.current = {value:"GREAT", img:great};
      point.current += 0.05;
    }
    else{
      faceImage.current = {value:"GOOD", img:good};
      point.current += 0.03;
    }
  
    if (faceImage.current === {value:"BAD", img:bad}){
      adviceGiveCounter.current += 1;
    }
    else
      adviceGiveCounter.current = 0;
  
    if (adviceGiveCounter.current >= 2){
      pushAdvice("もっと笑顔に！");
      adviceGiveCounter.current = 0;
    }
  }
  const moveXCoodinate = useRef<number>(0.0);
  const moveCount = useRef<number>(0);
  const attitudeImage = useRef<object>({value:"init", img:goodAttitude});
  const firstResFlag = useRef<boolean>(true);
  const setAttitudeImage = (nowCoodinate:number) => {
    const threshold = moveXCoodinate.current - nowCoodinate >= 0
    ? moveXCoodinate.current - nowCoodinate : - (moveXCoodinate.current - nowCoodinate);
    if (threshold > 0.1) {
      moveCount.current += 1;
      if(firstResFlag.current){
        attitudeImage.current = {value:"GOOD", img:goodAttitude};
        firstResFlag.current = false;
      }
      else
        attitudeImage.current = {value:"BAD", img:badAttitude};
        point.current -= 0.08;
        resultParams.current[1][0] -= 0.08;
        if(resultParams.current[1][0] < 0) resultParams.current[1][0] = 0;
    }
    else {
      moveCount.current = 0;
      attitudeImage.current = {value:"GOOD", img:goodAttitude};
      point.current += 0.05;
      resultParams.current[1][0] += 0.08;
      if(resultParams.current[1][0] < 0) resultParams.current[1][0] = 0;
    }

    if (moveCount.current >= 2) {
      if (moveCount.current % 3 === 0)
        pushAdvice("ゆらゆらしない！");
      point.current -= 0.02;
      resultParams.current[1][0] -= 0.02;
      if(resultParams.current[1][0] < 0) resultParams.current[1][0] = 0;
    }
    moveXCoodinate.current = nowCoodinate;
  }
  let detectionsWithExpressions : any;
  const loadModels = async () => {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.load('/models'), //ssdMobilenetv1
      faceapi.nets.faceExpressionNet.load('/models')
    ]);
  };
  const faceDetectHandler = async () => {
    await loadModels();
    if (webcamRef.current) {
      const video = webcamRef.current.video as HTMLVideoElement;
      detectionsWithExpressions = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()) //SsdMobilenetv1Options
      .withFaceExpressions();
      if (detectionsWithExpressions.length === 1){
        setAttitudeImage(detectionsWithExpressions[0].detection.relativeBox.left);
        setAdvice(detectionsWithExpressions[0].expressions);
        console.log(detectionsWithExpressions[0]);
        resultParams.current[0][0] += detectionsWithExpressions[0].expressions.happy + 0.5 * detectionsWithExpressions[0].expressions.neutral;
        resultParams.current[0][1] += 1;
        resultParams.current[1][1] += 1;
        updateScores(detectionsWithExpressions[0].expressions);
      }
    }
  };

  // ------------------------------------------
  // ---------音声認識-------------------------
  // -----------------------------------------

  const [file, setFile] = useState([]);
  const [audioState, setAudioState] = useState(true);
  const audioRef = useRef<any>();
  const voice_data = useRef<any>([]);
  const voice_ave = useRef<number>(0);

  const handleSuccess = (stream : any) => {
    
    // レコーディングのインスタンスを作成
    audioRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    });
    // 音声データを貯める場所
    var chunks : any = [];
    // 録音が終わった後のデータをまとめる
    audioRef.current.addEventListener("dataavailable", (ele : any) => {
      if (ele.data.size > 0) {
        chunks.push(ele.data);
      }

      const iconPram = new FormData()
      const blob = new Blob(chunks,  {type: 'video/webm'})
      const blob_file = new File([blob], "file1.webm", { type: 'video/webm'})
      iconPram.append('file', blob_file)
      console.log("nakami")
      console.log(blob)
      axios
        .post(
          'http://7c94-115-124-136-81.ngrok.io/upload',
          iconPram,
        ).then((response)=>{
          console.log(response.data);
          
          voice_data.current = response.data
          resultParams.current[2][0] += voice_data.current["energy"];
          resultParams.current[3][0] += voice_data.current["calm"];
          resultParams.current[4][0] += voice_data.current["joy"];
          resultParams.current[2][1] += 1;
          resultParams.current[3][1] += 1;
          resultParams.current[4][1] += 1;

        });

    });
    // 録音を開始したら状態を変える
    audioRef.current.addEventListener("start", () => setAudioState(false));
    // 録音がストップしたらchunkを空にして、録音状態を更新
    audioRef.current.addEventListener("stop", () => {
      setAudioState(true);
      chunks = [];
    });
  };

  // 録音停止
  const handleStop = () => {
    audioRef.current.stop();
  };

  const hancleError = () => {
    alert("エラーです。");
  };

  const handleStart = () => {
    setInterval(() => {
      // audioRef.current.state = "recording"
      audioRef.current.start();
      console.log(audioRef.current.state)
      setTimeout(() => {
        console.log(audioRef.current.state)
        audioRef.current.stop();
      }, 4000);
    }, 5000);
  }

  // ------------------------------------------
  // ---------音声認識　終了--------------------
  // ------------------------------------------
  let faceApiId:any = useRef(); 
  if(faceApiFlag.current){
    faceApiFlag.current = false;
    faceApiId.current = setInterval(() => {
      faceDetectHandler();
      console.log('実行が完了しました');
    }, 3000)
  }

  useEffect(() => {

    //音声認識の実行
    //audioのみtrue
    navigator.getUserMedia(
      {
        audio: true,
        // video: true,
      },
      handleSuccess,
      hancleError
    )
  }, [])

  const recordEnd = () => {
    handleStop();
    clearInterval(faceApiId.current);
  }
  
  //　アドバイス関連
  const advicesList = useRef<Array<string>>([]);
  const pushAdvice = (newAdvice:string) => {
    const tempList = [...advicesList.current, newAdvice];
    if (tempList.length > 5)
      tempList.shift();
    advicesList.current = tempList;
  }

  return (
    <>
      <Head>
        <title>inscoDX</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <Navbar questionsList={questionsList} addQuestion={addQuestion} deleteQuestion={deleteQuestion} />
        </div>
      </div>

      <div className="container-fluid" style={{background: "#000"}}>
        <div className="row">
          <div className="col-md-3 col-12">
            <div className="card border border-5 rounded-3 mt-3 border-warning">
              <div className="card-body" style={{background: "#777"}}>
                <Point point={point} />
                <Params faceImage={faceImage.current} attitudeImage={attitudeImage.current} />
                <Voice calm={voice_data.current["calm"]} energy={voice_data.current["energy"]}/>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="card card-body border border-5 rounded-pill mt-3 border-danger">
              <TitleText titleQuestion={titleQuestion} nowIndex={nowIndex} startFlag={startFlag} />
            </div>
            <div className="mt-3">
              <Webcam audio={false} ref={webcamRef} className="col-12 border border-5" />
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="card border border-5 rouded-3 mt-3 border-warning">
            <div className="card-body" style={{background: "#777"}}>
              <NowTime startFlag={startFlag} />
              <Advice advicesList={advicesList} />
              <Process nowIndex={nowIndex} questionsList={questionsList} />
              <NextStep setStartFlag={setStartFlag} indexProceed={indexProceed} startFlag={startFlag} endFlag={endFlag} resultParams={resultParams} recordEnd={recordEnd}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Capture
