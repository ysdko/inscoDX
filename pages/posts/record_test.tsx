import React, { useEffect, useState, useRef } from "react";

const record_test = ()=>{
function writeString(view : any, offset : any, string : any) {
  // https://medium.com/better-programming/how-to-iterate-through-strings-in-javascript-65c51bb3ace5
  // 文字列はfor-ofやforEachでイテレートできる
  [...string].forEach((char, index) => {
    view.setUint8(offset + index, char.charCodeAt(0))
  })
};

// 8bitの情報を16bitに変換する
function floatTo16BitPCM(output : any, offset : any, input : any) {
  input.forEach((datum : any, index : any) => {
    // 何しているのか全然わからない
    const s = Math.max(-1, Math.min(1, datum));
    const pcm = s < 0 ? s * 0x8000 : s * 0x7FFF

    // 2バイトずつ進めて書き込む
    output.setInt16(offset + (index * 2), pcm, true);
  })
};

function encodeToWAV(samples : any, sampleRate : any) {
  const headerSize = 44;
  // 8bitを16bitに変換するので、データサイズは2倍になる
  const outputDataLength = samples.length * 2;
  const outBuffer = new DataView(new ArrayBuffer(headerSize + outputDataLength));

  writeString(outBuffer, 0, 'RIFF');  // RIFFヘッダ
  outBuffer.setUint32(4, 32 + outputDataLength, true); // これ以降のファイルサイズ
  writeString(outBuffer, 8, 'WAVE'); // WAVEヘッダ
  writeString(outBuffer, 12, 'fmt '); // fmtチャンク
  outBuffer.setUint32(16, 16, true); // fmtチャンクのバイト数
  outBuffer.setUint16(20, 1, true); // フォーマットID
  outBuffer.setUint16(22, 1, true); // チャンネル数
  outBuffer.setUint32(24, sampleRate, true); // サンプリングレート
  outBuffer.setUint32(28, sampleRate * 2, true); // データ速度
  outBuffer.setUint16(32, 2, true); // ブロックサイズ

  // これを8ビットにすればPCM変換が簡単になる？
  outBuffer.setUint16(34, 16, true); // サンプルあたりのビット数
  writeString(outBuffer, 36, 'data'); // dataチャンク
  outBuffer.setUint32(40, outputDataLength, true); // 波形データのバイト数
  floatTo16BitPCM(outBuffer, headerSize, samples); // 波形データ

  return outBuffer;
};

// Float32Arrayの配列を一つのFloat32Arrayにまとめる
function mergeBuffers(audioData : any) {
  const bufferSize = audioData[0].length
  const totalBufferSize = audioData.length * bufferSize
  const totalBuffer = new Float32Array(totalBufferSize);

  for (let i = 0; i < audioData.length; i++) {
    totalBuffer.set(audioData[i], i * bufferSize)
  }

  return totalBuffer;
};

function toURL(dataview : any, fileType : any) {
  const audioBlob = new Blob([dataview], { type: fileType });
  return window.URL.createObjectURL(audioBlob);
}

// 録音データの全体サイズがわからないので、バッファサイズ単位で配列に保存
function copyAudioPerUnit(input : any, bufferSize : any, audioData : any) {
  const bufferData = new Float32Array(bufferSize);
  for (var i = 0; i < bufferSize; i++) {
    bufferData[i] = input[i];
  }

  audioData.push(bufferData);
};

function copyAudioData(audioData : any, stream : any) {
  // 音声データをaudioDataに溜め込むScriptProcessorを作る
  // https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createScriptProcessor
  const BUFFER_SIZE = 1024;
  const audioContext = new AudioContext();
  const scriptProcessor = audioContext.createScriptProcessor(BUFFER_SIZE, 1, 1);
  scriptProcessor.onaudioprocess = (e) => copyAudioPerUnit(e.inputBuffer.getChannelData(0), BUFFER_SIZE, audioData);

  // ストリームの途中にScriptProcessorを差し込む
  const mediaStreamSource = audioContext.createMediaStreamSource(stream);
  mediaStreamSource.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);

  return audioContext
};

function downloadWavFile(audioData : any, sampleRate : any) {
  const dataview = encodeToWAV(mergeBuffers(audioData), sampleRate);
  // const downloadLink = process.browser.document.getElementById('download');
  // downloadLink.href = toURL(dataview, 'audio/wav');
  // downloadLink.download = 'test.wav';
  // downloadLink.click();
}

// 録音開始
const audioData : any = [];
let audioSampleRate : any = null;
let audioContext : any = null;

useEffect(() => {
// !(async function () {
  // STOPボタンを押したらWavにエンコードしてダウンロードする。
  // const audioData : any = [];
  // let audioSampleRate = null;
  // let audioContext = null;
  // process.browser.document
  //   .getElementById('stop')
  //   .addEventListener('click', async (e) => {
  //     downloadWavFile(audioData, audioSampleRate);

  //     await audioContext.close()
  //     e.target.setAttribute('disabled', 'disabled');
  //   });

  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // getUserMediaしたときに録音開始するので、使いにくい。
  // 事前にAudioContextを用意したいです。
  // const stream = await navigator
  //   .getUserMedia({ audio: true, video: false })

    const stream = navigator.getUserMedia(
      {
        audio: true,
        video: false,
      })

  audioContext = copyAudioData(audioData, stream);
  audioSampleRate = audioContext.sampleRate;
// })()
    })

const start = async (e) =>{
  downloadWavFile(audioData, audioSampleRate);
  await audioContext.close()
  e.target.setAttribute('disabled', 'disabled');
}

return(
  <>
  
  <a id="download">Download</a>
  <button onClick = {start}>Stop</button>
  
  {/* ref: <a href="https://qiita.com/optimisuke/items/f1434d4a46afd667adc6">ブラウザで録音してwavで保存 - Qiita</a> */}
  
  </>
);
}

export default record_test