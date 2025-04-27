const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/oauth2/token', (req, res) => {
  const { grant_type, client_id, client_secret } = req.body;

  if (grant_type !== 'client_credentials') {
    return res.status(400).json({ error: 'unsupported_grant_type' });
  }

  if (client_id !== 'your-client-id' || client_secret !== 'your-client-secret') {
    return res.status(401).json({ error: 'invalid_client' });
  }

  res.json({
    access_token: 'mock-access-token-12345',
    token_type: 'bearer',
    expires_in: 3600
  });
});

// Protected API: /profile
app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: 'Missing Authorization Header' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  if (token !== 'mock-access-token-12345') {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }

  // If token is valid, return JSON data
  res.json({
    firstName: "Alice",
    lastName: "Smith",
    productId: "P12345"
  });
});


app.listen(port, () => {
  console.log(`Mock OAuth Server running at http://localhost:${port}`);
});
