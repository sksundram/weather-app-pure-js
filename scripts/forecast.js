// AccuWeather api key
const API_KEY = config.API_KEY;

// Get weather information
const getWeather = async locationKey => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${locationKey}?apikey=${API_KEY}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// Get city information
const getCity = async city => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${API_KEY}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
