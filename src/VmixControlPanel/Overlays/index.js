import React from 'react';

const Overlays = ({ overlays, selectedOverlay, selectOverlay, fadeOverlay }) => {
  console.log('Overlays', overlays)
  if(overlays && overlays.length > 0){
    console.log(overlays)
    return null;
  }
  return (
    <>
    <div className="inputs-container">
      {overlays.map((overlay) => (
        <div
          key={overlay.number}
          className={`input-box${
            selectedOverlay === overlay.number ? ' selected' : ''
          }`}
          onClick={() => selectOverlay(overlay.number)}
        >
          <h3>Input {overlay.number}</h3>
          <h3>Type: {overlay.type}</h3>
          <p>Name: {overlay.name}</p>
          <p>State: {overlay.state}</p>
        </div>
      ))}
    </div>
    <div className="fade-input-sticky">
    {selectedOverlay !== null && (
        <div>
        <p>Selected Input: {selectedOverlay}</p>
        <button
            className="fade-input"
            onClick={() => fadeOverlay(selectedOverlay)}
        >
            Fade Selected Input
        </button>
        </div>
    )}
    </div>
  </>
  );
};

export default Overlays;
