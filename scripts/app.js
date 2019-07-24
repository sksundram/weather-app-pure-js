const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = ({ cityDetails, weather }) => {
  // Update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `;

  // remove d-none class if present
  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }
};

const updateCity = async city => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

// Listen for form submission
cityForm.addEventListener('submit', e => {
  // Prevent default action
  e.preventDefault();

  // Get city value from the user's input
  const city = cityForm.city.value.trim();
  // Clear form fields
  cityForm.reset();

  // Update the UI with new city value
  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
