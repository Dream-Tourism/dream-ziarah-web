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
  // Debug: Log the selected location to see its structure
  console.log('Selected location in map:', selectedLocation);
  
  // State to manage the selected marker ID
  const [selectedMarkerId, setSelectedMarkerId] = useState(selectedLocation?.id);
  const [newMapZoom, setNewMapZoom] = useState(zoom);
  
  // Handle missing lng property
  const selectedLat = selectedLocation?.lat;
  const selectedLng = selectedLocation?.lng || selectedLocation?.longitude || 0;
  
  const [newLatLng, setNewLatLng] = useState([selectedLat, selectedLng]);

  // Handler for marker click
  const handleMarkerClick = (location) => {
    setSelectedMarkerId(location.id);
    markerClick(location.id);
    setNewMapZoom(16);
    
    const lat = location?.lat;
    const lng = location?.lng || location?.longitude || 0;
    setNewLatLng([lat, lng]);
    // Add any other logic you need when a marker is clicked
  };

  useEffect(() => {
    if (selectedLocation?.id) {
      setSelectedMarkerId(selectedLocation.id);
      setNewMapZoom(zoom);
      
      const lat = selectedLocation?.lat;
      const lng = selectedLocation?.lng || selectedLocation?.longitude || 0;
      setNewLatLng([lat, lng]);
    }
  }, [selectedLocation, zoom]);

  // Don't render map if coordinates are invalid
  if (!selectedLat || (selectedLng === undefined && !selectedLocation?.longitude)) {
    return (
      <div className="map-container">
        <div className="p-4 text-center">
          <p>Map cannot be displayed: Invalid coordinates</p>
          <p>Latitude: {selectedLat}, Longitude: {selectedLng}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-container">
      <MapContainer
        center={[selectedLat, selectedLng]}
        zoom={20}
        scrollWheelZoom={true}
        className="leaflet-map"
      >
        <TileLayer
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {itenarayItems?.map((location, idx) => {
          const isSelected = selectedMarkerId === location.id;
          const lat = location?.lat;
          const lng = location?.lng || location?.longitude || 0;
          
          // Only render marker if coordinates are valid
          if (lat && lng !== undefined) {
            return (
              <Marker
                key={location?.id}
                position={[lat, lng]}
                icon={createIcon(idx + 1, isSelected)}
                eventHandlers={{
                  click: () => handleMarkerClick(location),
                }}
              >
                {isSelected && <Popup>{location?.title}</Popup>}
              </Marker>
            );
          }
          return null;
        })}
        <ChangeMapView coords={newLatLng} zoom={newMapZoom} />
      </MapContainer>
    </div>
  );
}