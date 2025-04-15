import type { Coordinates } from "@/api/types";
import {useState,useEffect} from 'react';


interface GeoLocationState {
    Coordinates: Coordinates|null;
    error: string|null;
    isLoading: boolean;
}

export function useGeoLocation(){
const[locationData, setLocationData] = useState<GeoLocationState>({
    Coordinates:null,
    error:null,
    isLoading:true,
})
const  getLocation = () =>{
 setLocationData((prev)=>({...prev,isLoading:true,error:null}));
 if(!navigator.geolocation){
    setLocationData({
        Coordinates:null,
        error:"GeoLocation is not supported by your browser",
        isLoading: false,

    })
    return;
 }
 navigator.geolocation.getCurrentPosition((position)=>{
setLocationData({
    Coordinates:{
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    },
    error:null,
    isLoading:false,
})
 },(error) => {
    let errorMessage: string;
    
    switch(error.code){
        case error.PERMISSION_DENIED:
            errorMessage="Location permission denied, please enable location access";
            break;
    
        case error.POSITION_UNAVAILABLE:
            errorMessage="Location information is unavailable";
            break;
    
        case error.TIMEOUT:
            errorMessage="Location request timed out";
            break;
    
        default:
            errorMessage="An unknown error occured";
    }
    setLocationData({
        Coordinates:null,
        error: errorMessage,
        isLoading:false,
    
    }),
    {
        enableHighAccuracy:true,
        timeOut:5000,
        maximumAge:0,


    }

     }
    )
}
useEffect(
    ()=>{
        getLocation();
    }
    ,[]);
    return{
        ...locationData,
        getLocation,
    };



}