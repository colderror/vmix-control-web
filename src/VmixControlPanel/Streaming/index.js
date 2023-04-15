import React from 'react';

const Streaming = ({ streaming, startStream, stopStream }) => {
  return (
    <div>
      <h2>Streaming</h2>
      <h3>Stream Status: {streaming ? 'Started' : 'Stopped'}</h3>
      <h3>Stream Controls</h3>
      <button className="stream-control start" onClick={startStream}>
        Start Stream
      </button>
      <button className="stream-control stop" onClick={stopStream}>
        Stop Stream
      </button>
    </div>
  );
};

export default Streaming;
