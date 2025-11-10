import { create } from 'zustand';

interface LocationStore {
  userLocation: { lat: number; lng: number } | null;
  locationPermission: 'granted' | 'denied' | 'prompt';
  setUserLocation: (location: { lat: number; lng: number }) => void;
  setLocationPermission: (permission: 'granted' | 'denied' | 'prompt') => void;
  requestLocation: () => Promise<void>;
}

// Default: Banda Aceh center
const DEFAULT_LOCATION = { lat: 5.5483, lng: 95.3238 };

export const useLocationStore = create<LocationStore>((set) => ({
  userLocation: DEFAULT_LOCATION,
  locationPermission: 'prompt',
  
  setUserLocation: (location) => set({ userLocation: location }),
  
  setLocationPermission: (permission) => set({ locationPermission: permission }),
  
  requestLocation: async () => {
    if (!navigator.geolocation) {
      set({ locationPermission: 'denied', userLocation: DEFAULT_LOCATION });
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      set({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        locationPermission: 'granted',
      });
    } catch (error) {
      set({ locationPermission: 'denied', userLocation: DEFAULT_LOCATION });
    }
  },
}));
