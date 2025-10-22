I. Core Features & Functionality

Enlistment:

Action: Click a bot in the Bot Collection.

Result: Moves the bot into the Your Bot Army section.

Rule Check: Prevents duplicate bots from being enlisted.

Release (Temporary Remove):

Action: Click a bot in the Your Bot Army.

Result: Removes the bot from the army and returns it to the Bot Collection.

Technical Note: This is a state change only; no API call is made.

Discharge (Permanent Delete):

Action: Click the 'X' button on a bot in the Your Bot Army.

Result: Permanently deletes the bot from the application.

Technical Note: Sends a DELETE request to the API, removing the bot from the server's db.json file.


2.Technical Stack & Implementation

Frontend: Built using React (functional components and hooks).

Styling: Uses Custom, modular Plain CSS for styling and the responsive grid layout.

Component Design: The BotCard component is highly reusable for both the Collection and the Army sections.

Data Layer: Local REST API served by json-server using the db.json file.

Data Flow: The main logic in App.jsx handles initial data fetching (useEffect) and all state transformations (enlist, release, delete).

III. Setup and Installation

Prerequisites:
Node.js and npm (or yarn).

The json-server package (install globally with npm install -g json-server).

Steps:
Start the Mock Backend (API):

Open your terminal in the directory containing db.json.

Run the command: json-server --watch db.json --port 8001

Start the React Application:

Open a separate terminal window.

Run the command: npm start (or yarn start).

The application will then load and fetch data from the running mock API.