# International Student's Journey in Canada - Phaser Game

This project is a Phaser-based educational game designed to represent the cultural challenges and barriers faced by international students in Canada. The game is integrated with the MERN stack to manage user data, save progress, and enhance the gameplay experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Gameplay Mechanics](#gameplay-mechanics)
- [Challenges](#challenges)
- [Contributing](#contributing)
- [License](#license)

## Features

- Interactive game scenes illustrating cultural challenges and barriers
- User registration and authentication
- Save and load game progress
- Display leaderboards and user rankings
- Educational content on Canadian culture and student life

## Technologies Used

- **Frontend**: Phaser, HTML5, CSS, JavaScript
- **Backend**: MongoDB, Express.js, Node.js
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: Local storage for temporary data, MongoDB for persistent data
  

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/international-student-journey.git
    cd international-student-journey
    ```

2. **Backend Setup**:
    ```bash
    cd backend
    npm install
    ```

3. **Start the Backend Server**:
    ```bash
    node server.js
    ```

4. **Frontend Setup**:
    ```bash
    cd ../frontend
    ```

5. **Open the `index.html` file** in your browser to start the game.

## Usage

- **Register/Login**: Users can register and log in to save their progress and access personalized content.
- **Navigate the Game**: Use keyboard and mouse controls to interact with the game environment and NPCs.
- **Save Progress**: Progress can be saved manually in the game 

## Gameplay Mechanics

### Language Barrier

- NPCs speak with different accents.
- Players need to use context clues to understand and respond correctly.

### Cultural Customs and Etiquette

- Scenarios where players must follow cultural norms to progress.
- Tasks include attending cultural events and interacting with local residents.

### Social Integration

- Players face challenges related to real life situation face by international students.
- In-game events reflect some hard choices for the players.

## Challenges

1. **Learning Phaser Framework**:
   - Familiarize with the Phaser API and game development concepts.
   - Resources: Phaser official documentation, tutorials, and courses.

2. **Integrating Phaser with MERN Stack**:
   - Plan and define API endpoints for game interactions.
   - Use tools like Postman to test API endpoints independently.

3. **Handling Game State and Persistence**:
   - Manage game state with local storage and MongoDB.
   - Implement save/load functionalities for data consistency.

4. **Debugging and Performance Optimization**:
   - Use browser developer tools for real-time debugging.
   - Optimize game performance through efficient coding practices.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

