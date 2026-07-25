import { useCallback, useEffect, useRef, useState } from "react";

export interface LatLng {
  lat: number;
  lng: number;
}

type PermissionState = "idle" | "requesting" | "granted" | "denied" | "unsupported";

interface UseGeolocationResult {
  position: LatLng | null;
  status: PermissionState;
  errorMessage: string | null;
  requestLocation: () => void;
}

/**
 * Wraps the browser Geolocation API behind an explicit user-triggered
 * permission request (never auto-prompts on mount), and keeps watching
 * position after the user grants access so the map can track them live.
 */
export function useGeolocation(): UseGeolocationResult {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [status, setStatus] = useState<PermissionState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const watchId = useRef<number | null>(null);

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      setErrorMessage("Location services aren't available in this browser.");
      return;
    }

    setStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
        setErrorMessage(null);

        watchId.current = navigator.geolocation.watchPosition(
          (p) => setPosition({ lat: p.coords.latitude, lng: p.coords.longitude }),
          () => {
            /* keep last known position on a transient watch error */
          },
          { enableHighAccuracy: true, maximumAge: 10_000 },
        );
      },
      (err) => {
        setStatus("denied");
        setErrorMessage(
          err.code === err.PERMISSION_DENIED
            ? "Location access was declined — showing an approximate position instead."
            : "Couldn't determine your location — showing an approximate position instead.",
        );
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  }, []);

  useEffect(() => {
    return () => {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  return { position, status, errorMessage, requestLocation };
}
