"use client";
import { useEffect, useState } from "react";

// IMPORTANT: the order matters!
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix the marker icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

// Function to create custom marker icon
const createIcon = (id, isSelected) => {
  const backgroundColor = isSelected ? "green" : "#ff0047";
  return L.divIcon({
    html: `<div style="
      display: flex;
      justify-content: center;
      align-items: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${backgroundColor};
      color: white;
      font-size: 16px;
      font-weight: bold;
    ">${id}</div>`,
    className: "",
  });
};

// Component to change map view
const ChangeMapView = ({ coords, zoom }) => {
  const map = useMap();
  map.setView(coords, zoom);
  return null;
};

export default function LeafletMap({
  selectedLocation,
  zoom,
  markerClick,
  itenarayItems,
}) {
  // State to manage the selected marker ID
  const [selectedMarkerId, setSelectedMarkerId] = useState(selectedLocation.id);
  const [newMapZoom, setNewMapZoom] = useState(zoom);
  const [newLatLng, setNewLatLng] = useState([
    selectedLocation?.lat,
    selectedLocation?.lng,
  ]);

  // Handler for marker click
  const handleMarkerClick = (location) => {
    setSelectedMarkerId(location.id);
    markerClick(location.id);
    setNewMapZoom(16);
    setNewLatLng([location?.lat, location?.lng]);
    // Add any other logic you need when a marker is clicked
  };

  useEffect(() => {
    if (selectedLocation.id) {
      setSelectedMarkerId(selectedLocation.id);
      setNewMapZoom(zoom);
      setNewLatLng([selectedLocation?.lat, selectedLocation?.lng]);
    }
  }, [selectedLocation]);

  return (
    <div className="map-container">
      {selectedLocation?.lat ? (
        <MapContainer
          center={[selectedLocation?.lat, selectedLocation?.lng]}
          zoom={20}
          scrollWheelZoom={true}
          className="leaflet-map"
        >
          <TileLayer
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {itenarayItems.map((location, idx) => {
            const isSelected = selectedMarkerId === location.id;
            return (
              <Marker
                key={location?.id}
                position={[location?.lat, location?.lng]}
                icon={createIcon(idx + 1, isSelected)}
                eventHandlers={{
                  click: () => handleMarkerClick(location),
                }}
              >
                {isSelected && <Popup>{location?.title}</Popup>}
              </Marker>
            );
          })}
          <ChangeMapView coords={newLatLng} zoom={newMapZoom} />
        </MapContainer>
      ) : (
        ""
      )}
    </div>
  );
}
