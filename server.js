require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const EXAROTON_API_KEY = process.env.EXAROTON_API_KEY;
const EXAROTON_BASE_URL = 'https://api.exaroton.com/v1';

app.use(express.json());
app.use(express.static('public'));

// Get list of servers
app.get('/api/servers', async (req, res) => {
  try {
    console.log('Fetching servers from Exaroton API...');
    console.log('API Key exists:', !!EXAROTON_API_KEY);

    const response = await axios.get(`${EXAROTON_BASE_URL}/servers`, {
      headers: {
        'Authorization': `Bearer ${EXAROTON_API_KEY}`
      }
    });

    console.log('Exaroton API Response Status:', response.status);
    console.log('Number of servers:', response.data.data?.length || 0);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching servers:', error.response?.data || error.message);
    console.error('Error status:', error.response?.status);

    // Return empty data if API fails
    res.json({
      success: false,
      data: [],
      error: 'Failed to fetch servers from Exaroton API'
    });
  }
});

// Get server details
app.get('/api/servers/:id', async (req, res) => {
  try {
    const serverId = req.params.id;
    console.log(`Fetching server details for: ${serverId}`);

    const response = await axios.get(`${EXAROTON_BASE_URL}/servers/${serverId}`, {
      headers: {
        'Authorization': `Bearer ${EXAROTON_API_KEY}`
      }
    });

    console.log(`Server ${serverId} details fetched successfully`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching server ${req.params.id}:`, error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to fetch server details'
    });
  }
});

// Start server
app.post('/api/servers/:id/start', async (req, res) => {
  try {
    const serverId = req.params.id;
    console.log(`Starting server: ${serverId}`);

    const response = await axios.post(`${EXAROTON_BASE_URL}/servers/${serverId}/start`, {}, {
      headers: {
        'Authorization': `Bearer ${EXAROTON_API_KEY}`
      }
    });

    console.log(`Server ${serverId} start command sent successfully`);
    res.json({
      success: true,
      message: 'Server start initiated',
      data: response.data
    });
  } catch (error) {
    console.error(`Error starting server ${req.params.id}:`, error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to start server'
    });
  }
});

// Stop server
app.post('/api/servers/:id/stop', async (req, res) => {
  try {
    const serverId = req.params.id;
    console.log(`Stopping server: ${serverId}`);

    const response = await axios.post(`${EXAROTON_BASE_URL}/servers/${serverId}/stop`, {}, {
      headers: {
        'Authorization': `Bearer ${EXAROTON_API_KEY}`
      }
    });

    console.log(`Server ${serverId} stop command sent successfully`);
    res.json({
      success: true,
      message: 'Server stop initiated',
      data: response.data
    });
  } catch (error) {
    console.error(`Error stopping server ${req.params.id}:`, error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to stop server'
    });
  }
});

// Restart server
app.post('/api/servers/:id/restart', async (req, res) => {
  try {
    const serverId = req.params.id;
    console.log(`Restarting server: ${serverId}`);

    const response = await axios.post(`${EXAROTON_BASE_URL}/servers/${serverId}/restart`, {}, {
      headers: {
        'Authorization': `Bearer ${EXAROTON_API_KEY}`
      }
    });

    console.log(`Server ${serverId} restart command sent successfully`);
    res.json({
      success: true,
      message: 'Server restart initiated',
      data: response.data
    });
  } catch (error) {
    console.error(`Error restarting server ${req.params.id}:`, error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to restart server'
    });
  }
});

// Get server logs
app.get('/api/servers/:id/logs', async (req, res) => {
  try {
    const serverId = req.params.id;
    console.log(`Fetching logs for server: ${serverId}`);

    const response = await axios.get(`${EXAROTON_BASE_URL}/servers/${serverId}/logs`, {
      headers: {
        'Authorization': `Bearer ${EXAROTON_API_KEY}`
      }
    });

    console.log(`Server ${serverId} logs fetched successfully`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching logs for server ${req.params.id}:`, error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to fetch server logs'
    });
  }
});

// Send command to server
app.post('/api/servers/:id/command', async (req, res) => {
  try {
    const serverId = req.params.id;
    const { command } = req.body;

    console.log(`Sending command to server ${serverId}: ${command}`);

    const response = await axios.post(`${EXAROTON_BASE_URL}/servers/${serverId}/command`, {
      command: command
    }, {
      headers: {
        'Authorization': `Bearer ${EXAROTON_API_KEY}`
      }
    });

    console.log(`Command sent to server ${serverId} successfully`);
    res.json({
      success: true,
      message: 'Command sent successfully',
      data: response.data
    });
  } catch (error) {
    console.error(`Error sending command to server ${req.params.id}:`, error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: 'Failed to send command'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FelixCraft Panel running on port ${PORT}`);
  console.log(`Exaroton API Key: ${EXAROTON_API_KEY ? 'Loaded' : 'Missing'}`);
  console.log(`API Base URL: ${EXAROTON_BASE_URL}`);
});