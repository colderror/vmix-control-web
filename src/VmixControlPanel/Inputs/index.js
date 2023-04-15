import React from 'react';

const Inputs = ({ inputs, selectedInput, selectInput, fadeInput }) => {
  return (
    <>
    <div className="inputs-container">
      {inputs.map((input) => (
        <div
          key={input.number}
          className={`input-box${
            selectedInput === input.number ? ' selected' : ''
          }`}
          onClick={() => selectInput(input.number)}
        >
          <h3>Input {input.number}</h3>
          <h3>Type: {input.type}</h3>
          <p>Name: {input.name}</p>
          <p>State: {input.state}</p>
        </div>
      ))}
    </div>
    <div className="fade-input-sticky">
    {selectedInput !== null && (
        <div>
        <p>Selected Input: {selectedInput}</p>
        <button
            className="fade-input"
            onClick={() => fadeInput(selectedInput)}
        >
            Fade Selected Input
        </button>
        </div>
    )}
    </div>
  </>
  );
};

export default Inputs;
