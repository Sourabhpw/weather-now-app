import React from 'react';

function describeWeather(code) {
  if (code === 0) return { description: 'Clear sky', icon: '☀️' };
  if (code === 1) return { description: 'Mainly clear', icon: '🌤️' };
  if (code === 2) return { description: 'Partly cloudy', icon: '⛅' };
  if (code === 3) return { description: 'Overcast', icon: '☁️' };
  if ([45, 48].includes(code)) return { description: 'Fog', icon: '🌫️' };
  if ([51, 53, 55, 56, 57].includes(code)) {
    return { description: 'Drizzle', icon: '🌦️' };
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { description: 'Rain', icon: '🌧️' };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { description: 'Snow', icon: '❄️' };
  }
  if ([95, 96, 99].includes(code)) {
    return { description: 'Thunderstorm', icon: '⛈️' };
  }
  return { description: 'Unknown conditions', icon: '🌡️' };
}

function WeatherCard({ weather }) {
  const { current, units } = weather;
  const condition = describeWeather(current.weather_code);
  const locationName = [weather.city, weather.region, weather.country]
    .filter(Boolean)
    .join(', ');

  const formattedTime = current.time ? current.time.replace('T', ' ') : '';

  return (
    <section className="card weather-card border-0 shadow-sm" aria-label="Current weather">
      <div className="card-body p-4 p-md-5">
        <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
          <div>
            <p className="eyebrow mb-2">CURRENT WEATHER</p>
            <h2 className="h3 fw-bold mb-1">{locationName}</h2>
            <p className="text-secondary mb-0">{weather.timezone}</p>
          </div>
          <div className="weather-icon align-self-start" aria-hidden="true">
            {condition.icon}
          </div>
        </div>

        <div className="temperature-row d-flex align-items-center gap-3 my-4">
          <p className="temperature mb-0">
            {Math.round(current.temperature_2m)}
            <span>{units.temperature_2m}</span>
          </p>
          <p className="h5 fw-normal text-secondary mb-0">{condition.description}</p>
        </div>

        <div className="row g-3">
          <div className="col-12 col-sm-4">
            <div className="weather-detail">
              <span className="detail-label">Feels like</span>
              <strong>
                {Math.round(current.apparent_temperature)} {units.apparent_temperature}
              </strong>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="weather-detail">
              <span className="detail-label">Wind speed</span>
              <strong>
                {current.wind_speed_10m} {units.wind_speed_10m}
              </strong>
            </div>
          </div>
          <div className="col-12 col-sm-4">
            <div className="weather-detail">
              <span className="detail-label">Humidity</span>
              <strong>
                {current.relative_humidity_2m}{units.relative_humidity_2m}
              </strong>
            </div>
          </div>
        </div>

        {formattedTime && (
          <p className="small text-secondary mt-4 mb-0">
            Updated at {formattedTime} ({weather.timezone})
          </p>
        )}
      </div>
    </section>
  );
}

export default WeatherCard;
