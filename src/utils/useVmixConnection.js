import { useState } from 'react';
import axios from 'axios';

const useVmixConnection = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = async ({ ipAddress, port, username, password }) => {
    try {
      await axios.post('http://localhost:3001/connect', { ipAddress, port, username, password });
      setConnected(true);
      return { success: true };
    } catch (error) {
      console.error('Failed to connect to vMix API', error);
      return { success: false, error: 'Failed to connect. Please check your credentials and try again.' };
    }
  };

  return { connected, handleConnect };
};

export default useVmixConnection;