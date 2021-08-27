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
import smile from "../public/smile.png";
import normal from "../public/normal.png";
import sad from "../public/sad.png";
import calm from "../public/calm.jpg";
import move from "../public/buddha.jpg";
import TitleText from "../component/title";
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
  const resultParams = useRef<Array<Array<number>>>([[0.5, 0]]);
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
  const [scores, updateScores] = useState(initScores);
  const adviceGiveCounter = useRef<number>(0);
  const faceImage = useRef<StaticImageData>(normal);
  const setAdvice = (nextScores:any) => {
    if (nextScores.sad >  0.2)
      faceImage.current = sad;
    else if (nextScores.happy > 0.3)
      faceImage.current = smile;
    else
      faceImage.current = normal;
  
    if (faceImage.current === sad){
      adviceGiveCounter.current += 1;
    }
    else
      adviceGiveCounter.current = 0;
  
    if (adviceGiveCounter.current >= 3){
      pushAdvice("もっと笑顔に！");
      adviceGiveCounter.current = 0;
    }
  }
  const moveXCoodinate = useRef<number>(0.0);
  const moveCount = useRef<number>(0);
  const moveRemoveCount = useRef<number>(0);
  const moveImage = useRef<StaticImageData>(calm);
  const setMoveImage = (nowCoodinate:number) => {
    const threshold = moveXCoodinate.current - nowCoodinate >= 0
    ? moveXCoodinate.current - nowCoodinate : - (moveXCoodinate.current - nowCoodinate);
    if (threshold > 0.05) {
      moveCount.current += 1;
      moveRemoveCount.current = 0;
    }
    else {
      moveCount.current = 0;
      moveRemoveCount.current += 1;
    }

    if (moveCount.current >= 2) {
      moveImage.current = move;
      if (moveCount.current % 3 === 0)
        pushAdvice("ゆらゆらしないで！");
    }
    if (moveRemoveCount.current >= 2) {
        moveCount.current = 0;
        moveRemoveCount.current = 0;
        moveImage.current = calm;
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
        setMoveImage(detectionsWithExpressions[0].detection.relativeBox.left);
        setAdvice(detectionsWithExpressions[0].expressions);
        console.log(detectionsWithExpressions[0]);
        resultParams.current[0][0] += detectionsWithExpressions[0].expressions.happy;
        resultParams.current[0][1] += 1;
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

  const handleSuccess = (stream : any) => {
    
    // レコーディングのインスタンスを作成
    audioRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
    });
    // 音声データを貯める場所
    var chunks : any = [];
    // 録音が終わった後のデータをまとめる
    audioRef.current.addEventListener("dataavailable", (ele : any) => {
      // console.log("starttt")
      if (ele.data.size > 0) {
        chunks.push(ele.data);
        console.log("test2")
        console.log(file)
      }
      // 音声データをセット
      setFile(chunks);
      const test = file;
      // console.log("test:"+test)

      const iconPram = new FormData()
      // const blob = new Blob(chunks[0])
      const blob = chunks[0]
      iconPram.append('file', blob)
      console.log("nakami")
      chunks = [];
      console.log(blob)
      
  
      axios
        .post(
          'http://localhost:5000/upload',
          iconPram,
        ).then((response)=>{
          console.log(response.data);
        });

    });
    // 録音を開始したら状態を変える
    audioRef.current.addEventListener("start", () => setAudioState(false));
    // 録音がストップしたらchunkを空にして、録音状態を更新
    audioRef.current.addEventListener("stop", () => {
      setAudioState(true);
      chunks = [];
      console.log("test!")
      console.log(file)
    });
  };

  // 録音停止
  const handleStop = () => {
    audioRef.current.stop();
    console.log(file)
  };

  const hancleError = () => {
    alert("エラーです。");
  };

  const handleStart = () => {
    
    audioRef.current.start(3000);
    console.log("test")
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
    }, 1500)
  }

  useEffect(() => {
    // // 表情認識の実行？
    // setInterval(() => {
    //   faceDetectHandler();
    //   console.log('実行が完了しました');
    //   }, 1500)

    //音声認識の実行
    //audioのみtrue
    navigator.getUserMedia(
      {
        audio: true,
        video: true,
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

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3 col-12">
            <div className="card h-100 border border-5 rounded-3">
              <div className="card-body">
                <Advice advicesList={advicesList} />
                <Params faceImage={faceImage.current} shakeImage={moveImage.current} />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="card card-body border border-5 rounded-pill">
              <TitleText titleQuestion={titleQuestion} nowIndex={nowIndex} startFlag={startFlag} />
            </div>
            <div className="mt-3">
              <Webcam audio={false} ref={webcamRef} className="col-12 border border-5" />
            </div>
          </div>
          <div className="col-md-3 col-12">
            <div className="card h-100 border border-5 rouded-3">
            <div className="card-body">
              <NowTime />
              <Process />
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
