import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './VmixControlPanel.scss'
import Inputs from './Inputs';
import Overlays from './Overlays';
import Streaming from './Streaming';
import AutomaticMode from './AutomaticMode';
import Modal from '../Components/Modal';
import { ReactComponent as SettingsIcon } from '../images/settings_icon.svg';
import ScheduleMode from './ScheduleMode';

const VmixControlPanel = () => {
  const [inputs, setInputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [automaticMode, setAutomaticMode] = useState(false);
  const [selectedInputs, setSelectedInputs] = useState([]);
  const [intervalTime, setIntervalTime] = useState(5 * 60 * 1000); // Default: 5 minutes in milliseconds
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('inputs');
  const [scheduleMode, setScheduleMode] = useState(false);
  const [scheduleInputs, setScheduleInputs] = useState([]);
  const [scheduledDateTime, setScheduledDateTime] = useState(new Date());
  const [scheduleInterval, setScheduleInterval] = useState(5 * 60 * 1000); // Default: 5 minutes in milliseconds

  const selectInput = (inputNumber) => {
    setSelectedInput(inputNumber);
  };

  const fetchInputs = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/inputs');
      setInputs(response.data);
    } catch (error) {
      console.error('Failed to fetch inputs', error);
      return `Failed to fetch inputs ${error}`
    }
  }, []);

  const fadeInput = async (inputNumber) => {
    try {
      const response = await axios.post('http://localhost:3001/fade-input', { inputNumber });
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fade input', error);
      return `Failed to fade input ${error}`
    }
  };

  const fadeOverlay = async (overlayNumber) => {
    try {
        const response = await axios.post('http://localhost:3001/fade-overlay', { overlayNumber });
        console.log(response.data);
    } catch (error) {
        console.error('Failed to fade overlay', error);
        return `Failed to fade overlay ${error}`
    }
  };

  const startStream = async () => {
    try {
      const response = await axios.post('http://localhost:3001/start-stream');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to start streaming', error);
      return `Failed to start streaming ${error}`
    }
  };

  const stopStream = async () => {
    try {
      const response = await axios.post('http://localhost:3001/stop-stream');
      console.log(response.data);
    } catch (error) {
      console.error('Failed to stop streaming', error);
      return `Failed to stop streaming ${error}`
    }
  };

  const getStreamStatus = async () => {
    try {
      const response = await axios.get('http://localhost:3001/stream-status');
      console.log(response.data);
      setStreaming(response.data.streaming);
    } catch (error) {
      console.error('Failed to get stream status', error);
      return `Failed to get stream status ${error}`
    }
  };

  const getActiveInput = async () => {
    try {
        const response = await axios.get('http://localhost:3001/active-input');
        setActiveInput(response.data)
    } catch (error) {
        console.error('Failed to get active inputs', error);
        return `Failed to get active inputs ${error}`
    }
  };

  const polling = async () => {
    try {
      let errors = [];
      errors.push(await fetchInputs());
      errors.push(await getActiveInput());
      errors.push(await getStreamStatus());
      errors = errors.filter((error) => error !== undefined);
      if (errors.length > 0) {
        console.error('Polling failed', errors);
      }
      setTimeout(polling, 15000);
    } catch (error) {
      console.error('Polling failed', error);
    }
  }

  const toggleAutomaticMode = () => {
    setAutomaticMode(!automaticMode);
    if (automaticMode) {
      setShowModal(false);
      return () => {
        clearTimeout(polling);
      };
    } else {
      setShowModal(true);
    }
  };

  const toggleScheduleMode = () => {
    if (scheduleMode) {
      setShowModal(false);
    } else {
      setShowModal(true);
    }
    setScheduleMode(!scheduleMode);
  };
  

  // Close the modal and optionally turn off automatic mode
  const closeModal = (turnOffAutomaticMode = false) => {
    setShowModal(false);
    if (turnOffAutomaticMode) {
      setAutomaticMode(false);
    }
  };
  
  const loopInputs = useCallback(async () => {
    if (automaticMode && selectedInputs.length > 0) {
      for (const inputNumber of selectedInputs) {
        await fadeInput(inputNumber);
        await new Promise((resolve) => setTimeout(resolve, intervalTime));
      }
      loopInputs();
    }
  }, [automaticMode, selectedInputs, intervalTime]);

  const loopScheduledInputs = useCallback(async () => {
    if (scheduleMode && scheduleInputs.length > 0 && new Date() >= scheduledDateTime) {
      for (const inputNumber of scheduleInputs) {
        await fadeInput(inputNumber);
        await new Promise((resolve) => setTimeout(resolve, scheduleInterval));
      }
      loopScheduledInputs();
    }
  }, [scheduleMode, scheduleInputs, scheduleInterval, scheduledDateTime]);
  

  const handleInputSelect = (inputNumber) => {
    if (selectedInputs.includes(inputNumber)) {
      setSelectedInputs(selectedInputs.filter((num) => num !== inputNumber));
    } else {
      setSelectedInputs([...selectedInputs, inputNumber]);
    }
  };

  const handleIntervalChange = (event) => {
    setIntervalTime(Number(event.target.value) * 60 * 1000); // Convert minutes to milliseconds
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    polling();
    return () => {
      clearTimeout(polling);
    };
  }, []);

  useEffect(() => {
    if (scheduleMode) {
      const timeUntilSchedule = scheduledDateTime - new Date();
      const timeout = setTimeout(loopScheduledInputs, timeUntilSchedule);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loopScheduledInputs, scheduleMode, scheduledDateTime]);
  
  useEffect(() => {
    if (automaticMode) {
      const timeout = setTimeout(loopInputs, intervalTime);
      return () => {
        clearTimeout(timeout);
      }
    }
  }, [automaticMode]);


  return (
    <div className="App">
      <h1>vMix Control Panel</h1>
      <div className="auto-mode-container">
        <div>
          <h2>Automatic Mode</h2>
          <div className="toggle-settings-container">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={automaticMode}
                onChange={() => toggleAutomaticMode()}
              />
              <span className="toggle-switch-slider"></span>
            </label>
            <button className="settings-button" onClick={() => setShowModal(true)}>
                <SettingsIcon/>
            </button>
          </div>
        </div>
        <div>
          <h2>Schedule Mode</h2>
          <div className="toggle-settings-container">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={scheduleMode}
                onChange={() => toggleScheduleMode()}
              />
              <span className="toggle-switch-slider"></span>
            </label>
            <button className="settings-button" onClick={() => setShowModal(true)}>
                <SettingsIcon/>
            </button>
          </div>
        </div>
      </div>
      <h2>Active Input: {activeInput}</h2>
      <div className="tabs-container">
        <button className={`tab ${activeTab === 'inputs' ? 'active-tab' : ''}`} onClick={() => handleTabChange('inputs')}>Inputs</button>
        <button className={`tab ${activeTab === 'overlays' ? 'active-tab' : ''}`} onClick={() => handleTabChange('overlays')}>Overlays</button>
        <button className={`tab ${activeTab === 'streaming' ? 'active-tab' : ''}`} onClick={() => handleTabChange('streaming')}>Streaming</button>
      </div>
      {activeTab === 'inputs' && (
        <>
          <h2>Inputs</h2>
          <Inputs
            inputs={inputs}
            selectedInput={selectedInput}
            selectInput={selectInput}
            fadeInput={fadeInput}
          />
        </>
      )}
      {activeTab === 'overlays' && (
        <>
          <h2>Overlays</h2>
          <Overlays selectedInput={selectedInput} />
        </>
      )}
      {activeTab === 'streaming' && (
        <>
          <Streaming
            streaming={streaming}
            startStream={startStream}
            stopStream={stopStream}
          />
        </>
      )}
      <Modal showModal={showModal} closeModal={() => closeModal(false)}>
        <AutomaticMode
          automaticMode={automaticMode}
          toggleAutomaticMode={toggleAutomaticMode}
          inputs={inputs}
          selectedInputs={selectedInputs}
          handleInputSelect={handleInputSelect}
          intervalTime={intervalTime}
          handleIntervalChange={handleIntervalChange}
          showSettings={true} // Show settings inside the modal
        />
        {scheduleMode && (
          <ScheduleMode
            scheduleMode={scheduleMode}
            toggleScheduleMode={toggleScheduleMode}
            inputs={inputs}
            scheduleInputs={scheduleInputs}
            // handleScheduleInputSelect={handleScheduleInputSelect}
            scheduledDateTime={scheduledDateTime}
            // handleDateTimeChange={handleDateTimeChange}
            scheduleInterval={scheduleInterval}
            // handleScheduleIntervalChange={handleScheduleIntervalChange}
          />
        )}
      </Modal>
    </div>
  );
}

export default VmixControlPanel;