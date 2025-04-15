import {Button} from '@/components/ui/button';
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react';
import { useGeoLocation } from '@/hooks/use-geolocation';
import WeatherSkeleton from '@/components/loading-skeleton';
import { useForecastQuery, useReverseGeoCodeQuery, useWeatherQuery } from '@/hooks/use-weather';
import CurrentWeather from '@/components/current-weather';
import WeatherDetails from '@/components/weather-details';
import WeatherForecast from '@/components/weather-forecast';
// import { AlertCircle } from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert";
import HourlyTempreature from '@/components/hourly-tempreature';
import FavoriteCities from '@/components/favorite-cities';


const WeatherDashboard = () => {
    const{Coordinates,error:LocationError,getLocation,isLoading:LocationLoading}= useGeoLocation();
  

const weatherQuery = useWeatherQuery(Coordinates);
const locationQuery = useReverseGeoCodeQuery(Coordinates);
const forecastQuery = useForecastQuery(Coordinates)

console.log(weatherQuery.data);


    const handleRefresh = () =>{
        getLocation();

    if(Coordinates){
       weatherQuery.refetch();
       forecastQuery.refetch();
       locationQuery.refetch();
    }
    };

    if(LocationLoading){
        return <WeatherSkeleton />
    }
    if(LocationError){
        return(
        <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>{LocationError}</p>
            <Button onClick={getLocation} variant={'outline'} className="w-fit">
                <MapPin className="mr-2 h-4 w-4" />
                Enable Location
            </Button>
        </AlertDescription>
      </Alert>
        )
    }

    if(!Coordinates){
        return(
        <Alert variant="destructive">
        <AlertTitle> Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
        <p>Please enable location access to see your local weather.</p>
            <Button onClick={getLocation} variant={'outline'} className="w-fit">
                <MapPin className="mr-2 h-4 w-4" />
                Enable Location
            </Button>
        </AlertDescription>
      </Alert>
        )
    }

    const locationName = locationQuery.data?.[0];

    if (weatherQuery.error || forecastQuery.error){
    return(
        <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>failed to fetch weather data.Please try again.</p>
            <Button onClick={handleRefresh} variant={'outline'} className="w-fit">
                <RefreshCcw className="mr-2 h-4 w-4" />
               Retry
            </Button>
        </AlertDescription>
      </Alert>
    );
    }

    if(!weatherQuery.data || !forecastQuery.data){
        return(
            <WeatherSkeleton />
        )
    }

return (
    <div className="space-y-4">
        <FavoriteCities />
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">My Location</h1>
            <Button variant={'outline'} size={"icon"} 
            onClick={handleRefresh}
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
            >
                <RefreshCcw className= {`h-4 w-4 ${weatherQuery.isFetching? "animate-spin": ""}`} />
            </Button>
        </div>
        <div className='grid gap-6'>
        <div className='flex flex-col lg:flex-row gap-4'>
        <CurrentWeather data={weatherQuery.data} locationName={locationName} />
        <HourlyTempreature data={forecastQuery.data} />
        </div>

        <div className='grid gap-6 md:grid-cols-2 items-start'>
        <WeatherDetails data={weatherQuery.data} />
        <WeatherForecast data={forecastQuery.data} />
        </div>
      
        </div>
    </div>
)
}

export default WeatherDashboard;