# Project Name

Project Focus

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Project Structure](#project-structure)

## About the Project

Project Focus is a time-tracking and productivity app using the Pomodoro technique. It features user login, timer setup, study tracking, and analytics.

## Technologies Used

- [React](https://reactjs.org/) - The frontend library
- [React Router](https://reactrouter.com/) - For routing
- [Axios](https://axios-http.com/) - For handling HTTP requests
- [Styled Components](https://styled-components.com/) - For styling (or specify any CSS framework you use)
- [Nodejs]
- [Other dependencies/libraries]

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) - Make sure you have Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aasimalikhan/Project-Focus.git
   ```
2. Configuration
   Replace the below environment variables in .env file
   Replace MONGODB_URL with your local mongodb connection string
   Replace APP_PASSWORD with your app password created on google
   Replace CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET with your credentials on cloudinary

3. Backend Setup

   Install backend dependencies

   ```bash
   npm i
   npm run start
   ```
   Now the backend restapi service has started on port 5000

4. Frontend Setup
   ```bash
   cd client
   ```
   Install frontend dependencies
   ```bash
   npm i
   npm run start
   ```
   Now the frontend service has started on port 3000

## Project Structure
    -- Project-Focus (base)
        --client (contains frontend code)
        --controller (contain controller files which define rest endpoints and logic)
        --middleware (contain backend middlewares for rest endpoints)
        --models (contain entity model in mongoose (mongodb))
        --routes (contain route definitions)
        --server.js (starting point for backend server)
        --package.json (dependendency details)
        --package-lock.json (dependency details - extras)

