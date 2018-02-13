const https = require('https');
const api = require('./api.json');

// Print out temp details.
function printWeather(weather) {
    const message = `The current temperature in ${weather.location.city} is ${weather.current_observation.temp_f} degrees Fahrenheit.`;
    console.log(message);
}

// Print out error message.
function printError(error) {
    console.error(`ERROR: ${error}.`);
}

function get(query) {
    const URL = `https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`;

    try {
        const request = https.get(URL, response => {
                            const requestIsGood = (response.statusCode >= 200 && response.statusCode < 300) ? true : false;

                            if(!requestIsGood) {
                                printError(error.message);
                                return;
                            }

                            let body = "";

                            // Read the data
                            response.on('data', chunk => {
                                body += chunk;
                            });

                            response.on('end', () => {
                                try {
                                    // Parse the data.
                                    const weather = JSON.parse(body);
                                    // Print the data.
                                    printWeather(weather);
                                } catch(error) {
                                    printError(error.message);
                                }
                            });

                            response.on('error', error => {
                                printError(error.message);
                            }); 
                        });
    } catch(error) {
        printError(error.message);
    }
}

module.exports.get = get;