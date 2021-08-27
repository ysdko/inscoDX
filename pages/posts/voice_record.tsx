import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from 'axios';

const record = () => {
  const [file, setFile] = useState([]);
  const [audioState, setAudioState] = useState(true);
  const audioRef = useRef<any>();
  

  useEffect(() => {
    //audioのみtrue
    navigator.getUserMedia(
      {
        audio: true,
        video: false,
      },
      handleSuccess,
      hancleError
    );
  }, []);

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
  // 録音開始
  const handleStart = () => {
    
    audioRef.current.start(3000);
    console.log("testttttt")

    // audioRef.current.stop();
    // function alertMsg(){
    //   console.log("3秒経過しました");
    // }
    
    // await setTimeout(alertMsg, 10000);
    // audioRef.current.stop();
    // console.log(audioRef.current)

  };
  // setInterval(handleStart,3000)

  // 録音停止
  const handleStop = () => {
    audioRef.current.stop();
    console.log(file)
  };
  // バックエンドに音声ファイルを送信
  const handleSubmit = () => {
    console.log(file)
    const iconPram = new FormData()
    const blob = new Blob(file)
    iconPram.append('file', blob)

    axios
      .post(
        'http://localhost:5000/upload',
        iconPram,
      ).then((response)=>{
        console.log(response.data);
      });

    // axios
    //   .get('/hello')
    //   .then((response)=>{
    //     console.log(response);
    //   });
    // async () => {
    //   const res = await fetch('http://127.0.0.1:5000/hello');
    //   const data = await res.json();
    //   console.log(data)
  
    // }
  };
  const handleRemove = () => {
    setAudioState(true);
    setFile([]);
  };

  const hancleError = () => {
    alert("エラーです。");
  };

  const callback = useCallback(() => {
    const config = {
        method: "POST"
    }
    fetch("http://localhost:5000/upload", config)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
},[])


  return (
    <div>
      <button onClick={handleStart}>録音</button>
      <button onClick={handleStop} disabled={audioState}>
        ストップ
      </button>
      <button onClick={handleSubmit} disabled={file.length === 0}>
        送信
      </button>
      <button onClick={handleRemove}>削除</button>
      {/* <p>message: {test} </p> */}
      <button onClick={callback} >ボタン</button>

    </div>
    
  );
};

export default record