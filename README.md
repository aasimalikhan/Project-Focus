# Project Focus

A Time-Tracking and Productivity App

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Structure](#project-structure)
- [Features](#features)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About the Project

Project Focus is a time-tracking and productivity app that utilizes the Pomodoro Technique. It allows users to:
- Login and create an account
- Set up timers for focused work sessions
- Track study progress
- Analyze their productivity data

## Technologies Used

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: A routing library for React applications.
- **Axios**: A promise-based HTTP client for making requests to APIs.
- **Styled Components**: A CSS-in-JS library for styling React components.

### Backend
- **Node.js**: A JavaScript runtime environment.

## Getting Started

### Prerequisites
- **Node.js and npm**: Ensure you have Node.js and npm installed on your system. [Download here](https://nodejs.org/en).

### Installation

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/aasimalikhan/Project-Focus.git
2. **Configuration**:
   - Update environment variables in the .env file:

   - **MONGODB_URL**: Your MongoDB connection string.

   - **APP_PASSWORD**: Secure app password created on Google Cloud Platform (for API access).

   - **CLOUD_NAME**, **CLOUD_API_KEY**, **CLOUD_API_SECRET**: Cloudinary credentials for image storage.

3. **Backend Setup**:
   Install backend dependencies and start the API service:

   ```bash
   cd Project-Focus
   npm install
   npm run start
   ```
   This starts the backend server on port 5000.

4. **Frontend Setup**:
   Navigate to the frontend directory, install dependencies, and start the application:

   ```bash
   cd client
   npm install
   npm run start
   ```
   This starts the frontend application on port 3000.

### Project Structure

Project-Focus/  
├── client/ - **Contains frontend code**  
│   └── ...  
├── controller/ - **Contains controller files for API endpoints and logic**  
│   └── ...  
├── middleware/ - **Contains backend middlewares for API endpoints**  
│   └── ...  
├── models/ - **Entity models for MongoDB with Mongoose**  
│   └── ...  
├── routes/ - **Route definitions**  
│   └── ...  
├── server.js - **Starting point for the backend server**  
├── package.json - **Dependency details**  
└── package-lock.json - **Dependency details - additional information**  

### Features
- **User Authentication**: Secure login and registration.
- **Timer Setup**: Set up and track work sessions with Pomodoro timers.
- **Productivity Tracking**: View progress and analyze productivity data.

### Usage
- Start the backend server.
- Start the frontend application.
- Register or log in to the application.
- Set a timer for a study session and start tracking your progress.
- View analytics to analyze productivity trends.

### Contributing
Contributions are welcome! Please fork this repository and open a pull request.

### License
Distributed under the MIT License.

### Contact
For any questions, feel free to reach out at aasimalikhan54321@gmail.com.