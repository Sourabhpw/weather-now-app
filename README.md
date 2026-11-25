# Weather Now 🌤️

A clean, responsive single-page weather web application built with **React 18**, **Vite**, and **Bootstrap 5**. Weather Now allows users to search for any city in the world and instantly view real-time meteorological conditions powered by the free, public **Open-Meteo REST APIs**.

---

## 📌 Project Overview

This project was developed as an academic assignment demonstrating essential modern web development concepts:
- **Component-Driven Architecture:** Modular functional components in React.js.
- **REST API Integration:** Asynchronous data fetching using modern JavaScript `fetch()` and `async/await`.
- **State Management & Interactivity:** Managing controlled inputs, asynchronous request lifecycles, and UI state using React Hooks.
- **Modern UI & Responsive Design:** Polished interface styled with Bootstrap 5 and custom CSS, providing an optimal viewing experience across mobile phones, tablets, and desktops.

---

## ✨ Features

- 🔍 **City Search:** Search for any city worldwide with real-time geocoding.
- 🌡️ **Comprehensive Weather Metrics:**
  - Current ambient temperature (°C)
  - "Feels like" apparent temperature (°C)
  - Relative humidity percentage (%)
  - Wind speed (km/h)
  - Dynamic weather condition descriptions (e.g., Clear sky, Overcast, Rain, Thunderstorm)
  - Weather condition emoji icons
  - Formatted observation timestamp and local timezone
- 🛡️ **Robust Validation & Error Handling:**
  - Input validation (prevents empty or whitespace submissions)
  - Graceful handling of invalid or non-existent city names
  - Offline network detection and friendly error alerts
  - Race-condition mitigation using `useRef` to discard outdated API responses
- ⚡ **Optimized UX:**
  - Welcome empty state prompting users to search
  - Clear loading spinner feedback during network requests
  - Form submission via both button click and keyboard `Enter` key
  - Submit button auto-disables during active queries or blank input to prevent duplicate requests
- 📱 **Fully Responsive Layout:** Designed mobile-first using Bootstrap 5.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend library for declarative, component-based user interfaces |
| **Vite 6** | Modern frontend build tool and local development server |
| **Bootstrap 5** | Responsive CSS framework for grid, forms, buttons, alerts, and spinners |
| **JavaScript (ES6+)** | Core language features (`async/await`, Promises, `useRef`, `useState`) |
| **HTML5 & CSS3** | Semantic markup and custom presentation enhancements |
| **Open-Meteo APIs** | Free, open-source REST APIs for geocoding and meteorological data |

---

## 🌐 Public APIs Used

Weather Now integrates two complementary public REST endpoints from [Open-Meteo](https://open-meteo.com/):

1. **Open-Meteo Geocoding API:**
   - **Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`
   - **Purpose:** Converts the user's city name query into geographic coordinates (`latitude` and `longitude`).
   - **Authentication:** No API key required.

2. **Open-Meteo Weather Forecast API:**
   - **Endpoint:** `https://api.open-meteo.com/v1/forecast`
   - **Purpose:** Fetches live atmospheric metrics (`temperature_2m`, `apparent_temperature`, `relative_humidity_2m`, `wind_speed_10m`, `weather_code`) for the coordinates.
   - **Authentication:** No API key required.

---

## 📸 Screenshots

> *Tip: Take screenshots of your running application and place them in the project folder (or replace the placeholders below).*

### 1. Initial State
*Prompt card displayed when no search has been performed yet:*
```
+--------------------------------------------------------------+
|                        Weather Now                           |
|                    YOUR LOCAL FORECAST                       |
|                   Weather at a glance                        |
|                                                              |
| [ Enter city name...                      ] [ Search ]       |
|                                                              |
|               🌤️ Ready to explore the weather?               |
|      Type a city name such as Bengaluru, London, or Tokyo     |
+--------------------------------------------------------------+
```
*(Add your screenshot: `![Initial State](docs/screenshots/initial-state.png)`)*

### 2. Live Weather Results
*Detailed weather card displaying current conditions:*
```
+--------------------------------------------------------------+
| CURRENT WEATHER                                          ☀️   |
| Bengaluru, Karnataka, India                                  |
| Asia/Kolkata                                                 |
|                                                              |
|   26°C      Clear sky                                        |
|                                                              |
| [ Feels like: 26°C ]  [ Wind: 11 km/h ]  [ Humidity: 54% ]   |
| Updated at 2026-11-25 21:00 (Asia/Kolkata)                   |
+--------------------------------------------------------------+
```
*(Add your screenshot: `![Weather Result](docs/screenshots/weather-result.png)`)*

### 3. Error Handling & Validation
*Friendly warning displayed when a city is not found or connection is lost:*
```
+--------------------------------------------------------------+
| ⚠️ No city named "InvalidCityXYZ" was found.                 |
|    Please check the spelling and try again.                  |
+--------------------------------------------------------------+
```
*(Add your screenshot: `![Error State](docs/screenshots/error-state.png)`)*

---

## 📁 Project Structure

```
weather-now/
├── .gitignore               # Git ignore rules (node_modules, build artifacts)
├── ASSIGNMENT_EXPLANATION.md # Comprehensive guide and viva preparation notes
├── index.html               # Main HTML entry file
├── package.json             # Manifest with project scripts and dependencies
├── package-lock.json        # Exact dependency lockfile
├── README.md                # Project documentation and instructions
└── src/
    ├── App.jsx              # Main application component & state coordinator
    ├── main.jsx             # React DOM root initialization
    ├── styles.css           # Global custom styles and theme styling
    └── components/
        ├── Navbar.jsx       # Application header navigation
        ├── SearchForm.jsx   # Controlled city search form
        └── WeatherCard.jsx  # Weather presentation card
```

---

## 🚀 Installation and Local Setup

### 1. Clone or Extract the Project
Ensure all project files are situated in your local project folder:
```bash
cd "weather-now"
```

### 2. Install Dependencies
Run npm to install all required packages:
```bash
npm install
```

### 3. Run the Development Server
Start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```
To preview the production bundle locally:
```bash
npm run preview
```

---

## 🎓 Academic Assignment Information

- **Project Title:** Weather Now — Single Page Weather Application
- **Course / Module:** [Your Course / Subject Name, e.g., Web Development / React.js Lab]
- **Student Name:** [Your Name]
- **Student ID / Roll No:** [Your Roll Number / Registration Number]
- **Department / Branch:** [Your Department / Branch, e.g., Computer Science & Engineering]
- **Institution / College:** [Your College / University Name]
- **Academic Year / Semester:** [e.g., 2026 / Semester IV]
- **Submission Date:** [Submission Date]

---

## 📄 License & Attribution

- Weather data provided by [Open-Meteo](https://open-meteo.com/) under the CC BY 4.0 license.
- Built for educational and assignment evaluation purposes.
