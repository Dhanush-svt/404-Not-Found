
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LocationMapProps {
  className?: string;
  locations?: Array<{
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
    type: 'donor' | 'receiver';
  }>;
  height?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  className, 
  locations = [],
  height = '400px' 
}) => {
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);

  const handleMapKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const key = formData.get('mapApiKey') as string;
    setMapApiKey(key);
    localStorage.setItem('map_api_key', key);
    toast({
      title: "API Key Saved",
      description: "Your map API key has been saved for this session."
    });
  };

  useEffect(() => {
    // Try to get the saved API key from localStorage
    const savedKey = localStorage.getItem('map_api_key');
    if (savedKey) {
      setMapApiKey(savedKey);
    }

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not access your location. Some map features may be limited.",
            variant: "destructive"
          });
        }
      );
    }
  }, [toast]);

  if (!mapApiKey) {
    return (
      <div className={`${className} border rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50`} style={{ height }}>
        <MapPin size={48} className="text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">Map API Key Required</h3>
        <p className="text-sm text-gray-500 text-center mb-4">
          To view the interactive map, please enter your Google Maps API key.
        </p>
        <form onSubmit={handleMapKeySubmit} className="w-full max-w-md space-y-2">
          <input 
            type="text" 
            name="mapApiKey"
            placeholder="Enter your Google Maps API Key"
            className="w-full px-3 py-2 border rounded-md text-sm"
            required
          />
          <button 
            type="submit"
            className="w-full bg-mm-green-600 text-white py-2 rounded-md hover:bg-mm-green-700 transition-colors"
          >
            Save API Key
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4 text-center">
          You can get an API key from the Google Cloud Platform Console.
          The key will be stored locally in your browser.
        </p>
      </div>
    );
  }

  // This is a placeholder for the actual map implementation
  // In a real app, you would use a library like Google Maps or Mapbox
  return (
    <div 
      ref={mapRef}
      className={`${className} border rounded-lg p-0 overflow-hidden relative bg-gray-100`} 
      style={{ height }}
    >
      {/* This is just a placeholder for the map UI */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-500">Map loading...</p>
      </div>
      
      {/* Fake map controls */}
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        <button className="w-8 h-8 bg-white rounded-md shadow flex items-center justify-center">+</button>
        <button className="w-8 h-8 bg-white rounded-md shadow flex items-center justify-center">-</button>
      </div>
      
      {/* User location indicator */}
      {userLocation && (
        <div className="absolute bottom-4 left-4 bg-white p-2 rounded-md shadow-md text-xs">
          Your location: Near you
        </div>
      )}
      
      {/* Note about integration */}
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md text-xs">
        For full map functionality, connect to Supabase and integrate with Google Maps API
      </div>
    </div>
  );
};

export default LocationMap;
