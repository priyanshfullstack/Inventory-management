import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [threshold, setThreshold] = useState(10);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSaveSettings = async () => {
    setError('');
    setMessage('');

    const thresholdValue = parseInt(threshold, 10);
    if (isNaN(thresholdValue) || thresholdValue < 0) {
      setError('Please enter a valid number greater than or equal to 0.');
      return;
    }

    try {
      await saveSettingsToDatabase(thresholdValue);
      setMessage('Settings saved successfully!');
    } catch (error) {
      setError('Error saving settings. Please try again.');
    }
  };

  const saveSettingsToDatabase = (threshold) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Settings saved:', threshold);
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <label>
        Low Stock Threshold:
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
      </label>
      <button onClick={handleSaveSettings}>Save Settings</button>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Settings;
