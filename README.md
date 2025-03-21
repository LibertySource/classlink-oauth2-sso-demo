# ClassLink OAuth2 SSO Demo

This application demonstrates a simple OAuth2 flow using ClassLink to authenticate staff and students.  Once authentication is complete an access token is obtained which can be used to access user data from the [ClassLink API](https://help.classlink.com/s/article/pp-access-user-data#oauth2).

Below is a step-by-step guide on how to install and use this application.

## Prerequisites

- Node.js: Ensure you have Node.js installed on your system. You can download it from [nodejs.org](nodejs.org).
- npm or yarn: These are package managers for Node.js. They come bundled with Node.js.
- ClassLink OAuth2 Credentials: You need a Client ID, Client Secret, and Redirect URI from ClassLink.

## Installation

1) **Clone the Repository**: \
    Clone this repository to your local machine using Git:

``` bash
git clone https://github.com/LibertySource/classlink-oauth2-sso-demo.git 
```

2) **Install Dependencies**: \
Navigate into the cloned repository and install the required dependencies:

``` bash
cd classlink-oauth2-sso-demo
npm install
# or
yarn install
```

## Configuration

Copy .env-sample to .env and obtain all necessary values.

## Usage

1) **Start the Server**: \
    Run the application using Node.js:

```bash
npm run dev
```

2) **Access the Login Page**: \
    Open a web browser and navigate to http://localhost:8080. You will be redirected to the ClassLink OAuth2 authorization page.

3) **Authorize the Application**: \
    Follow the prompts to authorize the application. After authorization, you will be redirected back to your server.

4) **Obtain Access Token**: \
    The access token will be displayed in JSON format on the page. You can use this token to make API requests to ClassLink services.
