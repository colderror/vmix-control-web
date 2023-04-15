import React from 'react';

const AutomaticMode = ({
  automaticMode,
  toggleAutomaticMode,
  inputs,
  selectedInputs,
  handleInputSelect,
  intervalTime,
  handleIntervalChange,
}) => {
  return (
    <div>
        <>
          <div className="checkbox-container">
            <h3>Select inputs to loop through:</h3>
            {inputs.map((input) => (
              <div key={`input-checkbox-${input.number}`} className="checkbox-box">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedInputs.includes(input.number)}
                    onChange={() => handleInputSelect(input.number)}
                  />
                  {`Input ${input.number}`}
                </label>
              </div>
            ))}
          </div>
          <div>
            <h3>Interval:</h3>
            <select
              className="interval-dropdown"
              value={intervalTime / (60 * 1000)}
              onChange={handleIntervalChange}
            >
              <option value={1}>1 minute</option>
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
        </>
    </div>
  );
};

export default AutomaticMode;

