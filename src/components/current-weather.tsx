import { WeatherData, GeocodingResponse } from "@/api/types";
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  console.log("Weather data received in CurrentWeather:", data);
  
  if (!data || !data.main || !data.weather || !data.wind) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          Weather data not available.
        </CardContent>
      </Card>
    );
  }

  const { 
    weather: [currentweather], // Changed from CurrentWeather to weatherInfo to avoid naming conflict
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed }
  } = data;

  const formatTemp = (temp:number) => `${Math.round(temp)}°`

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-end gap-1">
                <h2 className="text-2xl font-bold tracking-tighter">{locationName?.name}</h2>
                {locationName?.state && (<span className="text-muted-foreground">, {locationName.state}</span>)}
              </div>
              <p className="text-sm text-muted-foreground">{locationName?.country}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-5xl font-bold text-tighter">{formatTemp(temp)}</p>
              {/* <p className="text-sm text-muted-foreground">{weatherInfo.description}</p> */}
              <div className="space-y-1 ">
                <p className="text-sm font-medium text-muted-foreground">
                    Feels Like{formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 font-medium text-sm">
                    <span className="flex items-center gap-1 text-blue-500">
                        <ArrowDown className="h-4 w-4" />
                        {formatTemp(temp_min)}
                    </span>

                    <span className="flex items-center gap-1 text-red-500">
                        <ArrowUp className="h-4 w-4" />
                        {formatTemp(temp_max)}
                    </span>

                </div>
            </div>
            </div>

           <div className="grid grid-cols-2 gap-4">

           <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            <div className="space-y-0.5">
                <p className="text-sm font-medium">Humidity</p>
                <p className="text-sm text-muted-foreground">{humidity}%</p>
            </div>
           </div>

           <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-blue-500" />
            <div className="space-y-0.5">
                <p className="text-sm font-medium">Wind Speed</p>
                <p className="text-sm text-muted-foreground">{speed}m/s</p>
            </div>
           </div>

           </div>
          
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center">
                <img 
                src={`https://openweathermap.org/img/wn/${currentweather.icon}@4x.png`}
                alt={currentweather.description}
                className="h-full w-full object-contain"
                />
                <div className="absolute bottom-0 text-center">
                    <p className="text-sm font-medium capitalize">{currentweather.description}</p>
                </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

export default CurrentWeather;