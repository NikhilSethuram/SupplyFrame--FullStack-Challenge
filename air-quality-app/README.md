# ABOUT

SUPPLY FRAME FULL STACK CHALLENGE - US AQI

Thank you so much for this opportunity! Presenting US AQI - An Interactive US Air Quality Map Project .This is a web application designed to provide users with real-time air quality information across the United States. By using the power of environmental data APIs ( we use AQICN ), this application offers an intuitive and educational tool that promotes environmental awareness and helps users make informed decisions about their outdoor activities.

# FEATURES

I had so much fun doing this project! Setting up the svg based interactive US map was the biggest challenge. Someone who got into frontend through REACT.JS using node.js and express was quite challenging as this is my first time building a project with them. I love pushing boundaries and challengig myself and this was the perfect opportunity for me. I really hope you like this proejct too!

Interactive Map: Users can navigate a fully interactive SVG map of the United States. Each state is outlined and can be hovered over to reveal specific air quality information.

State-Specific Data: Upon hovering over a state, the app displays a popup with air quality data for the capital city of that state, including the Air Quality Index (AQI), key pollutants, and health advisories.

Real-Time Updates: The application integrates with the AQICN API to fetch real-time air quality data, ensuring that users have access to the latest information.

Responsive Design: With a mobile-first approach, the application is fully responsive and provides a seamless experience across various devices and screen sizes.

Accessibility: The application adheres to web accessibility guidelines, ensuring that it's usable by as many people as possible, including those with disabilities.

Caching Strategy: To optimize performance and reduce API calls, the application implements a caching mechanism. This ensures that data is stored temporarily and reused whenever possible, limiting the rate of API requests.

Testing: The application is tested using Jest, a delightful JavaScript Testing Framework with a focus on simplicity.

# SET UP

Once you clone the repo

USING DOCKER :

1. docker-compose up --build (to start container)
   you can then go to your browser and use http://localhost:3000/
2. docker-compose down (to stop containers)

MANUALLY :

1. npm i (to install necessary packages)
2. npm start (to start server)
3. visit http://localhost:3000/

# JEST test

In the tests directory created a test file app.test.js
wrote a test case for the endpoint /get-aqi. The goal was to ensure that when the endpoint was hit with a GET request, it responded correctly. This involved mocking the API call to the external AQICN API, so that we were not making real HTTP requests in our tests.

Modified package.json to include a script for test

command : npm test
this will display the output of our test to indicate success or failure
