#FlightFest

In this group project we created a website where you could find festivals with flights from your location within set dates returning the cost of the trip. I was able to practice paired programming and had a personal focus on the DOM and APIs.

After entering your location and dates of availability, the map will populate with possible festival locations with flights to and from which fit into your schedule. Clicking on a festival icon will bring up further information into the box below.

##APIs

The main APIs the app uses are the Skyscanner API, a Festivals API, the google maps and location API and an airports API we put together ourselves from various incomplete airport APIs available online which can be found in this repository.

##App

Do an npm install in the Assignment2 folder and the client folder to ensure you have all the correct dependencies for your the app.

run the server.js file with node from the terminal. It should come back with a message saying: 'Example app listening at http://:::3000'

Open up a new tab in the terminal and run webpack from the client folder with the command webpack -w. This should continue to run in this window and dynamically update as changes are made to the code.

Finally, to use the app open your browser and type: 'http://localhost:3000/' into the url to access the app.

###Next Steps

Return the prices in the further information box

rework the code to use a promise as opposed to the current recursive ajax work around
