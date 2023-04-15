import React from 'react';

const ScheduleMode = ({
  scheduleMode,
  toggleScheduleMode,
  inputs,
  scheduleInputs,
  handleScheduleInputSelect,
  scheduledDateTime,
  handleDateTimeChange,
  scheduleInterval,
  handleScheduleIntervalChange,
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
                  checked={scheduleInputs.includes(input.number)}
                  onChange={() => handleScheduleInputSelect(input.number)}
                />
                {`Input ${input.number}`}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3>Scheduled Date and Time:</h3>
          <input
            type="datetime-local"
            value={scheduledDateTime.toISOString().substring(0, 16)}
            onChange={handleDateTimeChange}
          />
        </div>
        <div>
          <h3>Interval:</h3>
          <select
            className="interval-dropdown"
            value={scheduleInterval / (60 * 1000)}
            onChange={handleScheduleIntervalChange}
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

export default ScheduleMode;
