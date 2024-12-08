const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// Helper function to get network details
function getConnectedDevices() {
  const interfaces = os.networkInterfaces();
  const devices = [];

  for (const interfaceName in interfaces) {
    interfaces[interfaceName].forEach(interface => {
      if (!interface.internal && interface.family === 'IPv4') {
        devices.push({
          name: os.hostname(),
          ip: interface.address,
        });
      }
    });
  }

  return devices;
}

// Serve HTML file
app.use(express.static('public'));

// Endpoint to fetch connected devices
app.get('/devices', (req, res) => {
  const devices = getConnectedDevices();
  res.json(devices);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
