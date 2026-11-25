import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar.jsx';
import SearchForm from './components/SearchForm.jsx';
import WeatherCard from './components/WeatherCard.jsx';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Tracks the active request ID to prevent race conditions from outdated network requests
  const latestRequestId = useRef(0);

  async function searchWeather(event) {
    if (event) {
      event.preventDefault();
    }

    const searchTerm = city.trim();

    if (!searchTerm) {
      setWeather(null);
      setError('Please enter a city name.');
      return;
    }

    // Increment request ID so any pending earlier request is ignored
    const requestId = ++latestRequestId.current;

    setLoading(true);
    setWeather(null);
    setError('');

    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        throw new Error('You appear to be offline. Please check your internet connection.');
      }

      // 1. Geocoding API: Convert city name to latitude and longitude
      const locationUrl = new URL(
        'https://geocoding-api.open-meteo.com/v1/search',
      );
      locationUrl.search = new URLSearchParams({
        name: searchTerm,
        count: '1',
        language: 'en',
        format: 'json',
      });

      const locationResponse = await fetch(locationUrl);

      // Discard response if a newer search was initiated
      if (requestId !== latestRequestId.current) {
        return;
      }

      if (locationResponse.status === 429) {
        throw new Error('Too many requests to the location service. Please wait a moment and try again.');
      }

      if (!locationResponse.ok) {
        throw new Error(
          `The location service is currently unavailable (Status ${locationResponse.status}). Please try again later.`,
        );
      }

      const locationData = await locationResponse.json();

      if (requestId !== latestRequestId.current) {
        return;
      }

      const location = locationData?.results?.[0];

      if (!location) {
        setError(`No city named "${searchTerm}" was found. Please check the spelling and try again.`);
        return;
      }

      // 2. Weather Forecast API: Fetch current weather for the coordinates
      const weatherUrl = new URL('https://api.open-meteo.com/v1/forecast');
      weatherUrl.search = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current:
          'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m',
        timezone: 'auto',
      });

      const weatherResponse = await fetch(weatherUrl);

      if (requestId !== latestRequestId.current) {
        return;
      }

      if (weatherResponse.status === 429) {
        throw new Error('Too many requests to the weather service. Please wait a moment and try again.');
      }

      if (!weatherResponse.ok) {
        throw new Error(
          `The weather service is currently unavailable (Status ${weatherResponse.status}). Please try again later.`,
        );
      }

      const weatherData = await weatherResponse.json();

      if (requestId !== latestRequestId.current) {
        return;
      }

      if (!weatherData?.current || !weatherData?.current_units) {
        throw new Error('Weather information is not available for this city right now.');
      }

      setWeather({
        city: location.name,
        region: location.admin1 || '',
        country: location.country || '',
        timezone: weatherData.timezone || 'Local',
        current: weatherData.current,
        units: weatherData.current_units,
      });
    } catch (requestError) {
      // Discard errors from older, superseded requests
      if (requestId !== latestRequestId.current) {
        return;
      }

      if (
        (typeof navigator !== 'undefined' && !navigator.onLine) ||
        requestError.name === 'TypeError' ||
        requestError.message.includes('Failed to fetch') ||
        requestError.message.includes('NetworkError')
      ) {
        setError('Network error: Unable to reach the weather service. Please check your internet connection.');
      } else {
        setError(
          requestError instanceof Error
            ? requestError.message
            : 'An unexpected error occurred while retrieving weather data.',
        );
      }
    } finally {
      // Only reset loading if this is the active request
      if (requestId === latestRequestId.current) {
        setLoading(false);
      }
    }
  }

  return (
    <>
      <Navbar />
      <main className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <section className="text-center mb-4">
              <p className="eyebrow mb-2">YOUR LOCAL FORECAST</p>
              <h1 className="display-5 fw-bold mb-3">Weather at a glance</h1>
              <p className="text-secondary mb-0">
                Search for a city to see its latest weather conditions.
              </p>
            </section>

            <SearchForm
              city={city}
              onCityChange={setCity}
              onSearch={searchWeather}
              loading={loading}
            />

            <div className="mt-4" aria-live="polite">
              {loading && (
                <div className="text-center text-secondary py-5" role="status">
                  <div
                    className="spinner-border text-primary mb-2"
                    role="status"
                    aria-hidden="true"
                  />
                  <div>Getting the latest weather...</div>
                </div>
              )}

              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 shadow-sm" role="alert">
                  <span aria-hidden="true" className="fs-5">⚠️</span>
                  <div>{error}</div>
                </div>
              )}

              {weather && <WeatherCard weather={weather} />}

              {!loading && !error && !weather && (
                <div className="card empty-state-card border-0 shadow-sm text-center p-4 p-md-5">
                  <div className="empty-state-icon mb-3" aria-hidden="true">
                    🌤️
                  </div>
                  <h2 className="h5 fw-bold mb-2">Ready to explore the weather?</h2>
                  <p className="text-secondary mb-0">
                    Type a city name such as <strong>Bengaluru</strong>, <strong>London</strong>, or <strong>Tokyo</strong> in the search box above to get real-time forecasts.
                  </p>
                </div>
              )}
            </div>

            <p className="text-center small text-secondary mt-4 mb-0">
              Weather data provided by Open-Meteo.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
