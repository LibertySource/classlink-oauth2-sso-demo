require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();

const CLASSLINK_AUTH_URL = 'https://launchpad.classlink.com/oauth2/v2/auth';
const CLASSLINK_TOKEN_URL = 'https://launchpad.classlink.com/oauth2/v2/token';

const PORT = process.env.PORT || 8080;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
    const authUrl = `${CLASSLINK_AUTH_URL}?scope=profile&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        
        // Replace placeholder in HTML with authUrl
        let html = data.replaceAll('{{authUrl}}', authUrl);
        html = html.replaceAll('{{StudentName}}', process.env.STUDENT_NAME);
        html = html.replaceAll('{{StudentPassword}}', process.env.STUDENT_PASSWORD);
        html = html.replaceAll('{{TeacherName}}', process.env.TEACHER_NAME);
        html = html.replaceAll('{{TeacherPassword}}', process.env.TEACHER_PASSWORD);
        html = html.replaceAll('{{ParentName}}', process.env.PARENT_NAME);
        html = html.replaceAll('{{ParentPassword}}', process.env.PARENT_PASSWORD);
        html = html.replaceAll('{{AdminName}}', process.env.ADMIN_NAME);
        html = html.replaceAll('{{AdminPassword}}', process.env.ADMIN_PASSWORD);
        res.send(html);
    });
});

// Login page with ClassLink OAuth2 link
app.get('/login', (req, res) => {
    const authUrl = `${CLASSLINK_AUTH_URL}?scope=profile&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    res.redirect(authUrl);
});

// OAuth2 Callback route
// app.get('/callback', async (req, res) => {
app.get('/classlink_callback', async (req, res) => {
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

       console.log(accessToken);
        
        const user = await axios.get('https://nodeapi.classlink.com/v2/my/info', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log(user.data)

        const resp = {
            token: accessToken,
            user: user.data,
        };

        res.json(resp);
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        res.status(500).send('Failed to exchange code for token');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

