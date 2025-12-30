import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export function useLocation() {
    const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    } | null>(null);

    useEffect(() => {
    (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        });
    })();
    }, []);
    return userLocation;
}