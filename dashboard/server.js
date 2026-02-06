const express = require('express');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();

// Security: Use absolute path for config file
const CONFIG_PATH = path.join(__dirname, '..', 'config', 'config.json');

// Security: Authentication configuration
const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD;

// Security: Warn if no password is set
if (!DASHBOARD_PASSWORD) {
  console.error('\n⚠️  WARNING: DASHBOARD_PASSWORD environment variable is not set!');
  console.error('⚠️  The dashboard will not be accessible until you set a password.');
  console.error('⚠️  Set DASHBOARD_PASSWORD in your environment or .env file.\n');
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Security: Rate limiting to prevent brute force attacks and DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 failed login attempts per windowMs
  skipSuccessfulRequests: true,
  message: 'Too many login attempts, please try again later.',
});

// Security: Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all requests
app.use(limiter);

// Security: Basic authentication middleware
const authenticate = (req, res, next) => {
  // Require password to be set
  if (!DASHBOARD_PASSWORD) {
    return res.status(503).send('Dashboard is not configured. Please set DASHBOARD_PASSWORD environment variable.');
  }
  
  const auth = req.headers.authorization;
  
  if (!auth) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Loupe Dashboard"');
    return res.status(401).send('Authentication required');
  }
  
  const [scheme, credentials] = auth.split(' ');
  if (scheme !== 'Basic') {
    return res.status(401).send('Invalid authentication scheme');
  }
  
  const [username, password] = Buffer.from(credentials, 'base64').toString().split(':');
  
  // Security: Constant-time comparison to prevent timing attacks
  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(DASHBOARD_PASSWORD);
  
  // Ensure buffers are same length to prevent length-based timing attacks
  if (passwordBuffer.length !== expectedBuffer.length) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Loupe Dashboard"');
    return res.status(401).send('Invalid credentials');
  }
  
  // Use crypto.timingSafeEqual for constant-time comparison
  const crypto = require('crypto');
  let isValid = false;
  try {
    isValid = crypto.timingSafeEqual(passwordBuffer, expectedBuffer);
  } catch (e) {
    isValid = false;
  }
  
  if (!isValid) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Loupe Dashboard"');
    return res.status(401).send('Invalid credentials');
  }
  
  next();
};

// Security: Input validation helper
const validateConfig = (config) => {
  const errors = [];
  
  if (!config.prefix || typeof config.prefix !== 'string' || config.prefix.trim().length === 0 || config.prefix.length > 5) {
    errors.push('Prefix must be a non-empty string with max 5 characters');
  }
  
  if (!config.adminID || typeof config.adminID !== 'string' || !/^\d+$/.test(config.adminID)) {
    errors.push('Admin ID must be a valid Discord user ID (numbers only)');
  }
  
  if (!config.ownerID || typeof config.ownerID !== 'string' || !/^\d+$/.test(config.ownerID)) {
    errors.push('Owner ID must be a valid Discord user ID (numbers only)');
  }
  
  return errors;
};

app.get('/', authLimiter, authenticate, (req, res) => {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    res.render('index', {
      prefix: config.prefix,
      adminID: config.adminID,
      ownerID: config.ownerID,
      error: null,
      success: null
    });
  } catch (error) {
    res.status(500).send('Error loading configuration');
  }
});

app.post('/update-config', authLimiter, authenticate, (req, res) => {
  try {
    // Security: Read existing config to preserve token
    const existingConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    
    const updatedConfig = {
      token: existingConfig.token, // Security: Don't allow token updates via web interface
      prefix: req.body.prefix,
      adminID: req.body.adminID,
      ownerID: req.body.ownerID
    };
    
    // Security: Validate input
    const errors = validateConfig(updatedConfig);
    if (errors.length > 0) {
      const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      return res.render('index', {
        prefix: config.prefix,
        adminID: config.adminID,
        ownerID: config.ownerID,
        error: errors.join(', '),
        success: null
      });
    }
    
    // Security: Use synchronous write with error handling
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig, null, 2), 'utf8');
    
    res.render('index', {
      prefix: updatedConfig.prefix,
      adminID: updatedConfig.adminID,
      ownerID: updatedConfig.ownerID,
      error: null,
      success: 'Configuration updated successfully!'
    });
  } catch (error) {
    res.status(500).send('Error updating configuration');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  console.log('Note: Set DASHBOARD_PASSWORD environment variable for authentication');
});
