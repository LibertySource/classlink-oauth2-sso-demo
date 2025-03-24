# ClassLink OAuth2 SSO Demo

This application demonstrates the ClassLink SSO process flow.  

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

Open a web browser and navigate to http://localhost:8080.  Then follow instruction on the page.