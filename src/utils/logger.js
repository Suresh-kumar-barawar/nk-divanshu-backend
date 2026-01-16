const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logToFile = (filename, message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  const filePath = path.join(logDir, filename);
  
  fs.appendFile(filePath, logMessage, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};

const logger = {
  info: (message) => {
    console.log(`ℹ️  ${message}`);
    logToFile('info.log', `INFO: ${message}`);
  },
  
  error: (message, error = null) => {
    console.error(`❌ ${message}`, error || '');
    logToFile('error.log', `ERROR: ${message} ${error ? JSON.stringify(error) : ''}`);
  },
  
  warn: (message) => {
    console.warn(`⚠️  ${message}`);
    logToFile('warn.log', `WARN: ${message}`);
  },
  
  success: (message) => {
    console.log(`✅ ${message}`);
    logToFile('info.log', `SUCCESS: ${message}`);
  },
  
  request: (req) => {
    const message = `${req.method} ${req.originalUrl} - IP: ${req.ip}`;
    console.log(`📥 ${message}`);
    logToFile('requests.log', message);
  }
};

module.exports = logger;