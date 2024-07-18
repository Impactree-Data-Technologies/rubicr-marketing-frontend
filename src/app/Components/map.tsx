import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon
const createCustomIcon = (name) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `<div class="marker-icon">
             <img src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png" />
             <span class="marker-label">${name}</span>
           </div>`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
};

const regions = [
  { name: 'North America', position: [37.09024, -95.712891], description: 'Climate action and diversity are front and center, with regulations pushing for reduced carbon footprints and inclusive workplaces.' },
  { name: 'Europe', position: [51.1657, 10.4515], description: 'Leading in sustainability and governance, stringent regulations like the EU Taxonomy promote environmental alignment and transparent corporate governance.' },
  { name: 'Asia', position: [34.0479, 100.6197], description: 'Implementing frameworks for economic resilience, such as Japan’s Corporate Governance Code and China’s Green Credit Guidelines.' },
  { name: 'Africa', position: [8.7832, 34.5085], description: 'Focusing on social impact and ethical practices, emphasizing resource management and social responsibility.' },
  { name: 'Latin America', position: [-14.235, -51.9253], description: 'Advancing environmental stewardship with regulations protecting biodiversity and promoting sustainable land use.' },
];

const InteractiveMap = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Why is ESG relevant for our business?</h2>
        <p className="text-lg mb-4">
          Here you can explore different regions and understand why ESG (Environmental, Social, and Governance) factors are important for our business in each area.
        </p>
        <MapContainer center={[20, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {regions.map((region, index) => (
            <Marker key={index} position={region.position} icon={createCustomIcon(region.name)}>
              <Popup>
                <div>
                  <h3 className="font-semibold">{region.name}</h3>
                  <p>{region.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;
