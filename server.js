require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const app = express();

//const CLASSLINK_AUTH_URL = 'https://launchpad.classlink.com/oauth2/v2/auth';
const CLASSLINK_TOKEN_URL = 'https://launchpad.classlink.com/oauth2/v2/token';
const CLASSLINK_INFO_URL = 'https://nodeapi.classlink.com/v2/my/info';

const PORT = process.env.PORT || 8080;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

app.get('/', (req, res) => {
    //const authUrl = `${CLASSLINK_AUTH_URL}?scope=profile&response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading file');
        }
        
        // Replace placeholder in HTML with authUrl
        //let html = data.replaceAll('{{authUrl}}', authUrl);
        let html = data.replaceAll('{{StudentName}}', process.env.STUDENT_NAME);
        html = html.replaceAll('{{StudentPassword}}', process.env.STUDENT_PASSWORD);
        html = html.replaceAll('{{TeacherName}}', process.env.TEACHER_NAME);
        html = html.replaceAll('{{TeacherPassword}}', process.env.TEACHER_PASSWORD);
        html = html.replaceAll('{{ParentName}}', process.env.PARENT_NAME);
        html = html.replaceAll('{{ParentPassword}}', process.env.PARENT_PASSWORD);
        html = html.replaceAll('{{AdminName}}', process.env.ADMIN_NAME);
        html = html.replaceAll('{{AdminPassword}}', process.env.ADMIN_PASSWORD);
        html = html.replaceAll('[CLASSLINK_TOKEN_URL]', CLASSLINK_TOKEN_URL);
        html = html.replaceAll('[CLASSLINK_INFO_URL]', CLASSLINK_INFO_URL);

        res.send(html);
    });
});

// OAuth2 Callback route
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

        const user = await axios.get(CLASSLINK_INFO_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const resp = {
            code: code,
            token: accessToken,
            user: user.data,
        };

        console.log(resp);

        res.json(resp);
    } catch (error) {
        console.error('Error fetching token:', error.response?.data || error.message);
        res.status(500).send('Failed to exchange code for token');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

