import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import "./about.css";

const Table = () => {
  const [locations, setLocations] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);
  const [locationData, setLocationData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/lo')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, 'text/html');
        const rows = Array.from(htmlDoc.querySelectorAll('tbody tr'));
        const locations = rows.map(row => {
          const columns = Array.from(row.querySelectorAll('td'));
          return {
            name: columns[0].textContent,
            link: columns[1].querySelector('a').href,
            eventCount: parseInt(columns[2].textContent, 10),
          };
        });
        setLocations(locations);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/coordinates')
      .then(response => response.json())
      .then(data => {
        setLocationData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  // Sort locations by number of events
  const sortedLocations = [...locations].sort((a, b) => sortAscending ? a.eventCount - b.eventCount : b.eventCount - a.eventCount);

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  const [timeoutId, setTimeoutId] = useState(null);

  return (
    <div className="container">
      <div className="title">
        <b>
          Table of All Contents &nbsp;
        </b>
      </div>
      <div className="result_bx">
        <table className="result-table">
          <thead>
            <tr>
              <th>Venue Name</th>
              <th>Link to Location Details</th>
              <th onClick={toggleSort} style={{cursor: 'pointer'}}>Number of Events</th>
            </tr>
          </thead>
          <tbody>
            {sortedLocations.map(location => (
              <tr key={location.name}>
                <td>{location.name}</td>
                <td><a href={location.link}>{location.link}</a></td>
                <td>{location.eventCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <LoadScript googleMapsApiKey="AIzaSyDnl5cb5IkZERJGggE5xutunRr3n-fNfrw">
      <GoogleMap
            mapContainerStyle={{ width: '85%', height: '85%' }}
            center={{ lat: 22.35665, lng: 114.12623 }}
            zoom={11}
          >
            {Array.isArray(locationData) && locationData.map((location, index) => (
              <Marker
                key={index}
                position={{
                  lat: location.lat,
                  lng: location.lng
                }}
                onMouseOver={() => {
                  clearTimeout(timeoutId);
                  setSelectedLocation(location);
                }}
                onMouseOut={() => {
                  setTimeoutId(setTimeout(() => {
                    setSelectedLocation(null);
                  }, 1000));
                }}
              />
  
            ))}
            {selectedLocation && (
              <InfoWindow
                position={{
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng
                }}
                onCloseClick={() => {
                  setSelectedLocation(null);
                }}
              >
                <div>
                  <p><a href={selectedLocation.link}>{selectedLocation.link}</a></p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Table;
