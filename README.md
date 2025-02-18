
# Hodlinfo

Hodlinfo is a cryptocurrency price tracker web application that fetches and displays the latest prices of various cryptocurrencies from WazirX API. This project includes a responsive frontend and a backend built with Express.js and MongoDB.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Features

- Display current prices of various cryptocurrencies.
- Show percentage change in prices over different time intervals.
- Light and dark mode support.
- Connect to Telegram button.
- Responsive design for mobile and desktop views.

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB database

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/hodlinfo.git
   cd hodlinfo

2. Install dependencies:

    ```sh
    npm install

3. Set up environment variables:

Create a .env file in the root directory and add the following:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ```

4. Start the server:

    ```sh
    npm start

5. Open your browser and navigate to:

    ```sh
    http://localhost:5000


## Usage

    - Open the application in your browser.
    - Use the dropdowns to select the currency and cryptocurrency.
    - View the best price to trade and other details.
    - Toggle between light and dark mode using the switch.
    - Add the application to your home screen using the provided button.

## Technologies

    - Frontend: HTML, CSS, JavaScript
    - Backend: Node.js, Express.js
    - Database: MongoDB
    - API: WazirX API for fetching cryptocurrency data
