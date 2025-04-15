'use client';

import React from 'react';
import Webcam from 'react-webcam';

const WebcamComponent = () => {
  // You can adjust the video constraints as needed
  const videoConstraints = {
    deviceId: {
      exact: 'cfa6d32c2b2a3149d83f734c92f53ffeae4a2dba0185b1eed1021ca0014435fd',
    },
    width: 1000,
    height: 720,
    facingMode: 'user',
  };

  return (
    <div
      style={{
        width: '300px',
        position: 'fixed',
        top: '0',
        margin: '1rem',
      }}
    >
      <Webcam
        audio={false} // Disable audio if not needed
        height={720}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export default WebcamComponent;
