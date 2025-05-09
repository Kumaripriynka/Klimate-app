# Klimate - Modern Weather Application

## Project Definition

Klimate is a comprehensive weather application designed to provide users with accurate, real-time weather information through an intuitive and visually appealing interface. The project addresses the common need for reliable weather data with a focus on user experience and personalization.

### Purpose
To deliver accessible weather information that helps users make informed decisions about their day-to-day activities based on current and forecasted weather conditions.

### Target Users
- Commuters planning their daily travel
- Outdoor enthusiasts scheduling activities
- Travelers researching destination weather
- Anyone who needs quick access to reliable weather information

### Core Problem Solved
Klimate eliminates the need to navigate through complex weather services by providing a streamlined, user-friendly interface with all essential weather data in one place. The application combines powerful data visualization with personalization features to create a weather experience tailored to each user's needs.

## Technical Implementation

Built with modern React and TypeScript, Klimate leverages the OpenWeatherMap API for data and implements a responsive design using Tailwind CSS with shadcn/ui components. The application features client-side data caching, persistent user preferences, and dynamic UI updates for a seamless experience across all devices.

## Key Features

### User Experience
- **Intelligent City Search**: Fast, autocomplete-enabled search functionality with support for global locations
- **Location Awareness**: Automatic weather detection for user's current location with permission
- **Theme Adaptation**: Thoughtfully designed dark and light modes that adjust to user preference
- **Responsive Design**: Seamlessly adapts from mobile to desktop with optimized layouts for each device

### Weather Information
- **Comprehensive Current Conditions**: Detailed current weather including temperature, feels-like temperature, humidity, wind speed and direction
- **Visual Weather Representation**: Weather condition icons and visual indicators for better comprehension
- **Hourly Temperature Tracking**: Interactive charts showing temperature and feels-like trends throughout the day
- **5-Day Weather Forecast**: Extended outlook with daily high/low temperatures and condition summaries

### Personalization
- **Favorites System**: One-click saving of frequently checked locations
- **Search History**: Automatically maintained record of recent location searches
- **Persistent Preferences**: User settings and saved locations preserved between sessions
- **Quick Access Dashboard**: Streamlined view of favorite locations with current conditions

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API, TanStack Query (React Query)
- **Routing**: React Router
- **Data Visualization**: Recharts
- **API Integration**: OpenWeatherMap API
- **Build Tool**: Vite

## Architecture & Code Organization

The project follows a modular architecture emphasizing separation of concerns and reusability:

### Data Flow Architecture
```
User Interaction → React Components → Custom Hooks → API Services → External Weather API
```

### Directory Structure
```
src/
├── api/                  # API integration layer
│   ├── config.ts         # API endpoints and configuration
│   ├── types.ts          # TypeScript interfaces for API responses
│   └── weather.ts        # Weather service with fetch handling
├── components/           # Reusable UI components
│   ├── CitySearch.tsx    # Command palette for city search
│   ├── CurrentWeather.tsx # Current conditions display
│   ├── FavoriteButton.tsx # Star button for saving locations
│   ├── FavoriteCities.tsx # Horizontal scrolling favorites
│   ├── HourlyTemperature.tsx # Temperature chart component
│   ├── WeatherDetails.tsx # Additional weather metrics
│   ├── WeatherForecast.tsx # 5-day forecast display
│   └── ui/               # Base UI components (shadcn)
├── context/              # Global state management
│   └── theme-provider.tsx # Theme context and controller
├── hooks/                # Custom React hooks for business logic
│   ├── use-favorite.tsx  # Favorites management with localStorage
│   ├── use-geolocation.ts # Browser location services
│   ├── use-local-storage.tsx # Persistent storage abstraction
│   ├── use-search-history.tsx # Recent searches tracking
│   └── use-weather.ts    # Weather data fetching with React Query
├── pages/                # Route-based page components
└── layouts/              # Page layout templates
```

### Key Technical Decisions
- **State Management**: Combination of React Query for server state and Context for UI state
- **Data Persistence**: Local storage for user preferences and favorites
- **API Integration**: Custom service layer with error handling and response typing
- **Component Design**: Composition-based approach with specialized components

## Getting Started

### Prerequisites
- Node.js (v16.0.0 or higher)
- npm or yarn package manager
- OpenWeatherMap API key ([Register here](https://home.openweathermap.org/users/sign_up))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/klimate.git
   cd klimate
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Yes |

## Application Usage Guide

### For Users

#### Core Functionality
- **Home View**: Upon loading, the app attempts to detect your location and show local weather
- **Location Permission**: Allow location access when prompted for personalized weather data
- **City Search**: Click the search bar and type at least 3 characters to find locations
- **Weather Details**: View comprehensive weather information including:
  - Current temperature and conditions
  - Feels-like temperature
  - Wind speed and direction
  - Humidity percentage
  - Sunrise and sunset times
  - Daily forecast

#### Advanced Features
- **Favorites Management**:
  - Add locations to favorites by clicking the star icon
  - Access favorites quickly from the search dropdown
  - View current conditions of favorite locations in the scrollable favorites bar
  - Remove from favorites with the X button or by clicking the star again

- **History & Navigation**:
  - Recently searched locations appear in the search dropdown
  - Clear search history with one click
  - Navigate between cities seamlessly

- **Appearance Settings**:
  - Toggle between light and dark modes with the sun/moon icon
  - Theme preference is remembered between sessions

## API Integration

### OpenWeatherMap API

This project integrates with the OpenWeatherMap API to provide accurate weather data. You'll need to [register for an API key](https://openweathermap.org/api) to use this application.

#### Endpoints Utilized

| Endpoint | Purpose | Response Data |
|----------|---------|---------------|
| `/data/2.5/weather` | Current weather conditions | Temperature, humidity, wind, pressure, etc. |
| `/data/2.5/forecast` | 5-day/3-hour forecast | Temperature, conditions at 3-hour intervals |
| `/geo/1.0/direct` | Forward geocoding | Converts city names to coordinates |
| `/geo/1.0/reverse` | Reverse geocoding | Converts coordinates to location names |

#### Integration Architecture

The API integration is structured through:

1. **Configuration Layer** (`config.ts`): 
   - API base URLs and default parameters
   - Environment variable management

2. **Type Definitions** (`types.ts`):
   - TypeScript interfaces for all API responses
   - Ensures type safety throughout the application

3. **Service Layer** (`weather.ts`):
   - Method-based API with clean abstractions
   - Error handling and response processing
   - URL parameter construction

4. **React Query Integration** (`use-weather.ts`):
   - Caching and deduplication of requests
   - Loading, error, and success states
   - Automatic refetching when needed

## Future Development Roadmap

The following features are planned for future releases:

- **Weather Alerts**: Push notifications for severe weather conditions
- **Historical Weather Data**: Access past weather information for selected locations
- **Weather Maps**: Interactive maps showing precipitation, temperature, and wind patterns
- **Multiple Units**: Toggle between metric and imperial measurement systems
- **Weather Widgets**: Embeddable widgets for sharing on other platforms
- **Offline Support**: Basic functionality when network connectivity is limited
- **User Accounts**: Cloud synchronization of favorites across devices

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Run tests to ensure quality (`npm test`)
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style Guidelines

This project follows these coding standards:
- Use TypeScript for type safety
- Follow React functional component patterns with hooks
- Document complex functions and components
- Write meaningful commit messages

## Dependencies

Key libraries and frameworks used:

| Package | Version | Purpose |
|---------|---------|---------|
| React | 18.x | UI library |
| TypeScript | 5.x | Static typing |
| React Router | 6.x | Client-side routing |
| TanStack Query | 4.x | Data fetching |
| Tailwind CSS | 3.x | Styling |
| shadcn/ui | latest | UI components |
| Recharts | 2.x | Data visualization |
| date-fns | 2.x | Date formatting |
| Lucide React | latest | Icons |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)

---

Made with 🧡 by Priyanka Singh
