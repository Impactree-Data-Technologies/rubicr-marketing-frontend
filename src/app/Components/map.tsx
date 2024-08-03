import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createCustomIcon = (name: string) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="bg-blue-500 text-white rounded-lg py-1 px-2 font-bold text-sm shadow-lg whitespace-nowrap flex items-center justify-center" style="min-width: 100px; height: 30px;">
        ${name}
      </div>
    `,
    iconSize: [100, 30],
    iconAnchor: [50, 15],
    popupAnchor: [0, -15],
  });
};

interface Region {
  name: string;
  position: [number, number];
  description: string;
}

const regions: Region[] = [
  { name: 'North America', position: [37.09024, -95.712891], description: 'Climate action and diversity are front and center, with regulations pushing for reduced carbon footprints and inclusive workplaces.' },
  { name: 'Europe', position: [51.1657, 10.4515], description: 'Leading in sustainability and governance, stringent regulations like the EU Taxonomy promote environmental alignment and transparent corporate governance.' },
  { name: 'Asia', position: [34.0479, 100.6197], description: 'Implementing frameworks for economic resilience, such as Japans Corporate Governance Code and Chinas Green Credit Guidelines.' },
  { name: 'Africa', position: [8.7832, 34.5085], description: 'Focusing on social impact and ethical practices, emphasizing resource management and social responsibility.' },
  { name: 'Latin America', position: [-14.235, -51.9253], description: 'Advancing environmental stewardship with regulations protecting biodiversity and promoting sustainable land use.' },
  
];

const InteractiveMap: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">
          ESG Relevance Across Regions
        </h2>
        <p className="text-lg mb-8 text-center text-gray-600 max-w-2xl mx-auto">
          Explore how Environmental, Social, and Governance (ESG) factors impact our business across different regions. Click on the markers to learn more.
        </p>
        <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{ height: '600px', width: '100%' }}
            className="rounded-lg shadow-inner"
            scrollWheelZoom={false}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomright" />
            {regions.map((region, index) => (
              <Marker key={index} position={region.position} icon={createCustomIcon(region.name)}>
                <Popup>
                  <div className="max-w-xs">
                    <h3 className="font-bold text-lg mb-2 text-blue-600">{region.name}</h3>
                    <p className="text-gray-700">{region.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;