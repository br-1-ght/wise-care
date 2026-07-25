import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLng } from "../../hooks/useGeolocation";

function pinIcon(color: string, label: string) {
  return L.divIcon({
    className: "",
    html: `<div style="
        background:${color};
        width:34px;height:34px;border-radius:9999px;
        display:flex;align-items:center;justify-content:center;
        border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.35);
        font-size:15px;
      ">${label}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
}

const userIcon = pinIcon("#0A5C36", "📍");
const providerIcon = pinIcon("#B8962E", "🩺");

function FitBounds({ points }: { points: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length < 2) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [48, 48] });
  }, [map, points]);
  return null;
}

interface LocationMapProps {
  userPosition: LatLng;
  providerPosition: LatLng;
  userIsApproximate?: boolean;
}

export function LocationMap({ userPosition, providerPosition, userIsApproximate }: LocationMapProps) {
  const points = useMemo(() => [userPosition, providerPosition], [userPosition, providerPosition]);
  const center: [number, number] = [userPosition.lat, userPosition.lng];

  return (
    <div className="h-64 w-full overflow-hidden rounded-xl border border-brand-border sm:h-80">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        <Polyline positions={points.map((p) => [p.lat, p.lng])} pathOptions={{ color: "#0A5C36", weight: 3, dashArray: "6 8" }} />
        <Marker position={[userPosition.lat, userPosition.lng]} icon={userIcon}>
          <Popup>{userIsApproximate ? "Your approximate location" : "Your location"}</Popup>
        </Marker>
        <Marker position={[providerPosition.lat, providerPosition.lng]} icon={providerIcon}>
          <Popup>Your provider</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
