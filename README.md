# Map Creation Project

The goal of this project is to create an interactive space map, where different elements such as planets, comets, and suns can be placed in different positions on the map using POST requests to an API.

## Project Phases

### Phase 1: Completing the Map with Polyanets

In this initial phase, the main objective is to complete the map with elements called "Polyanets". These elements are placed manually using POST requests to the corresponding API. The process involves identifying the positions where Polyanets are desired and using the `handleCreatePolyanet` function to create them.

### Phase 2: Automated Element Creation

In this phase, the process of creating elements on the map is automated. The map is represented as a matrix, and the `createMap` function iterates over each position in the matrix. Depending on the value at that position (e.g., "SPACE", "POLYANET", "BLUE_SOLOON", etc.), the appropriate functions are used to create the corresponding element.

An important step in this phase is introducing a delay between the POST requests to create the elements. This is done to avoid overloading the API and to ensure that the requests are made effectively. The `delay` function is used to add the desired delay between requests.

## Usage Instructions

1. Clone this repository on your local machine.
2. Install project dependencies using the command `npm install`.
3. Modify the necessary variables in the code files to set up your credentials and configurations.
4. Run the application using the command `npm start` or similar, depending on your project's setup.
