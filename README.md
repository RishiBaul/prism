Backend Api

An Enpoint exposed of an api to receive form data from front end and validate the same against the rules written using JOI.

Table of Contents:

1. Installation
2. Usage
3. Configuration

Installation:

1. Clone the repository to your local machine.
   git clone https://github.com/RishiBaul/prism.git

2. Navigate to the project directory.
   cd prism

3. Install dependencies using npm or yarn.
   npm install
   # or
   yarn install

Usage:

Describe how to use your project. Include any necessary steps or commands required to run the project locally.

   # Run the project
   npm start
   # or
   yarn start

Configuration:

Environment Variables:

This project uses environment variables for configuration. Create a .env file in the project root and define the following variables:

- PORT: The port number on which the server will run.
- MONGO_PORT: The port of your MongoDB server.
- MONGO_URL: The URL of your MongoDB server.
- MONGO_USERNAME: (Optional) Username for MongoDB authentication.
- MONGO_PASSWORD: (Optional) Password for MongoDB authentication.
- MONGO_DB: The name of the MongoDB database.

Example .env file:

PORT=4000
MONGO_PORT=27017
MONGO_URL=localhost
MONGO_DB=prism

