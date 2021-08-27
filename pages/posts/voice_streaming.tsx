import { useEffect, useRef, useState } from "react"

const IndexPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<any>();
  const [file, setFile] = useState([]);
  const [audioState, setAudioState] = useState(true);
  
   // 録音開始
  const handleStart = () => {
    
    audioRef.current.start();
  };


  // 録音停止
  const handleStop = () => {
    
    audioRef.current.stop();
    console.log(file)
  };
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true, video: true});

    const setVideoStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // console.log(videoRef.current)
        // console.log(stream)
        const recorder=new MediaRecorder(stream)
        console.log(recorder)
        console.log("test")
      }
    }


    
    const handleSuccess = (stream : any) => {
      console.log("test")
      
      // const audio=audioRef.current
      // レコーディングのインスタンスを作成
      audioRef.current  = new MediaRecorder(stream, {
        mimeType: "video/webm;codecs=vp9",
      });
      // 音声データを貯める場所
      var chunks : any = [];
      // 録音が終わった後のデータをまとめる
      audioRef.current.addEventListener("dataavailable", (ele : any) => {
        if (ele.data.size > 0) {
          chunks.push(ele.data);
        }
        // 音声データをセット
        setFile(chunks);
      });
      // 録音を開始したら状態を変える
      audioRef.current.addEventListener("start", () => setAudioState(false));
      // 録音がストップしたらchunkを空にして、録音状態を更新
      audioRef.current.addEventListener("stop", () => {
        setAudioState(true);
        chunks = [];
      });
    };
    
    setVideoStream();
    handleSuccess

  }, [])
  
  return (
    <>
      {/* <div>
        <video
          style={{ width: '300px', height: '300px', maxWidth: '100%' }}
          ref={videoRef}
          autoPlay
          playsInline
        />
      </div> */}
      <div>
      <button onClick={handleStart}>録音</button>
      <button onClick={handleStop} disabled={audioState}>
        ストップ
      </button>
      {/* <button onClick={handleSubmit} disabled={file.length === 0}>
        送信
      </button>
      <button onClick={handleRemove}>削除</button> */}
      {/* <ReactAudioPlayer src={URL.createObjectURL(new Blob(file))} controls /> */}
    </div>
    </>
  )
}

export default IndexPage