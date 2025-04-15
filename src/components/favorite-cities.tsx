import { useFavorite } from '@/hooks/use-favorite';
import React from 'react';
import { ScrollArea } from './ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Loader2, X } from 'lucide-react';
import { useWeatherQuery } from '@/hooks/use-weather';
import { toast } from 'sonner';

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

const FavoriteCities = () => {
  const { favorites, removeFavorite } = useFavorite();
  console.log("FAVORITES:", favorites);


  if (!favorites.length) {
    return null;
  }

  return (
    <>
    <div>
    <h1 className="text-xl font-bold tracking-tight mb-3">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => {
                removeFavorite.mutate(city.id);
              }}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
     
    </>
  );
};

function FavoriteCityTablet({id, name, lat, lon, onRemove}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <div
      onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
      role='button'
      tabIndex={0}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from favorites`);
        }}
        className="absolute top-2 right-2 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{name},  <span className="text-sm text-muted-foreground">{weather?.sys.country}</span></h3>
       
        {isLoading ? (
          <div className="flex h-8 items-center justify-center">
             <Loader2 className="h-4 w-4 animate-spin" />
          </div>
         
        ) : (
          weather && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {Math.round(weather.main.temp)}°C
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="h-8 w-8"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default FavoriteCities;