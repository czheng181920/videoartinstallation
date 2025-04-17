'use client';

import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const forwardTimesRef = useRef([]);
  const [withBoxes, setWithBoxes] = useState(true);
  const [avgTime, setAvgTime] = useState(0);
  const [fps, setFps] = useState(0);

  const MODEL_URL = '/'; // <-- put your models here

  // 1) load models once
  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    }
    loadModels();
  }, []);

  // 2) start webcam + kick off the loop
  const startVideo = async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    const videoEl = webcamRef.current?.video;
    if (videoEl) {
      videoEl.srcObject = stream;
      videoEl.play();
      onPlay();
    }
  };

  // 3) keep a running window of the last 30 frame times & compute avg / fps
  function updateTimeStats(timeInMs) {
    const times = [timeInMs, ...forwardTimesRef.current].slice(0, 30);
    forwardTimesRef.current = times;
    const avg = times.reduce((sum, t) => sum + t, 0) / times.length;
    setAvgTime(Math.round(avg));
    setFps(Math.round(1000 / avg));
  }

  // 4) the “onPlay” loop—detect + draw, then recurse
  async function onPlay() {
    console.log('onPlay');
    const videoEl = webcamRef.current?.video;
    const canvas = canvasRef.current;

    if (!(videoEl instanceof HTMLVideoElement)) {
      console.error('Canvas is not an instance of HTMLCanvasElement');
      return setTimeout(onPlay, 100);
    }
    if (!videoEl || videoEl.paused || videoEl.ended) {
      return setTimeout(onPlay, 100);
    }

    console.log('onPlay2');
    // run detection + expressions
    const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 224 });
    const ts = Date.now();
    console.log('getting results....', videoEl, options);
    const result = await faceapi
      .detectSingleFace(videoEl, options)
      .withFaceExpressions();

    console.log('result', result);
    updateTimeStats(Date.now() - ts);

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (result) {
      // match video dims, resize detection, then draw
      faceapi.matchDimensions(canvas, {
        width: videoEl.videoWidth,
        height: videoEl.videoHeight,
      });
      const resized = faceapi.resizeResults(result, {
        width: videoEl.videoWidth,
        height: videoEl.videoHeight,
      });
      if (withBoxes) {
        faceapi.draw.drawDetections(canvas, resized);
      }
      faceapi.draw.drawFaceExpressions(canvas, resized, 0.05);
    }

    setTimeout(onPlay, 100);
  }

  return (
    <div style={{ position: 'relative', width: 300 }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        mirrored
        style={{ width: 300, height: 168 }}
      />
      <canvas
        ref={canvasRef}
        width={300}
        height={168}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
        }}
      />

      <div style={{ marginTop: 8 }}>
        <label>
          <input
            type="checkbox"
            onChange={(e) => setWithBoxes(!e.target.checked)}
          />{' '}
          Hide bounding boxes
        </label>
      </div>
      <div>
        <label>Avg Time: {avgTime} ms</label>
      </div>
      <div>
        <label>FPS: {fps}</label>
      </div>
    </div>
  );
};

export default WebcamComponent;
