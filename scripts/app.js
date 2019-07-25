const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

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

  // Update the day/night & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);

  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
  time.setAttribute('src', timeSrc);

  // Remove d-none class if present
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

  // Set localStorage
  localStorage.setItem('city', city);
});

// Check if localStorage already contains city key
if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}
