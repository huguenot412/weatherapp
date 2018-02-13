const weather = require('./weather');
// Join multiple values passed as arguments and replace all spaces with underscores like so:
// query: 90201
// query: Cleveland_OH
// query: London_England
const query = process.argv.slice(2).join("_").replace(' ', '_');

weather.get(query);