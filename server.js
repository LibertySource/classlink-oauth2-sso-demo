require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080;

const CLASSLINK_AUTH_URL = 'https://launchpad.classlink.com/oauth2/v2/auth';
const CLASSLINK_TOKEN_URL = 'https://launchpad.classlink.com/oauth2/v2/token';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

// Login page with ClassLink OAuth2 link
app.get('/login', (req, res) => {
    const authUrl = `${CLASSLINK_AUTH_URL}?scope=profile&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    res.redirect(authUrl);
});

// OAuth2 Callback route
// app.get('/callback', async (req, res) => {
app.get('/', async (req, res) => {
    const { code } = req.query;
    if (!code) {
        return res.status(400).send('Authorization code not provided');
    }

    try {
        const response = await axios.post(CLASSLINK_TOKEN_URL, null, {
            params: {
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
            },
        });
        
        const accessToken = response.data.access_token;

	// https://nodeapi.classlink.com/v2/my/info
	// Authorization Bearer token

        res.json({ accessToken });
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        res.status(500).send('Failed to exchange code for token');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

