import React, { createContext, useContext, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

const PropertyContext = createContext();

const App = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Beautiful Apartment',
      location: 'New York',
      price: 120,
      amenities: ['Wifi', 'Kitchen', 'Air Conditioning'],
    },
    {
      id: 2,
      name: 'Cozy Cottage',
      location: 'San Francisco',
      price: 90,
      amenities: ['Wifi', 'Parking', 'Pet Friendly'],
    },
  ]);
  const [likedProperties, setLikedProperties] = useState([]);

  return (
    <PropertyContext.Provider value={{ properties, likedProperties, setLikedProperties }}>
      <Router>
        <nav className="navbar">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/liked" className="nav-link">Liked Properties</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PropertyList />} />
          <Route path="/liked" element={<LikedProperties />} />
        </Routes>
      </Router>
    </PropertyContext.Provider>
  );
};

const PropertyList = () => {
  const { properties, setLikedProperties } = useContext(PropertyContext);

  const likeProperty = (property) => {
    setLikedProperties((prev) => [...prev, property]);
  };

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property.id} className="property-item">
          <h2>{property.name}</h2>
          <p>{property.location}</p>
          <p>${property.price} per night</p>
          <p>Amenities: {property.amenities.join(', ')}</p>
          <button onClick={() => likeProperty(property)}>Like</button>
        </div>
      ))}
    </div>
  );
};

const LikedProperties = () => {
  const { likedProperties } = useContext(PropertyContext);

  return (
    <div className="liked-properties">
      <h2>Liked Properties</h2>
      {likedProperties.length === 0 ? (
        <p>No liked properties yet.</p>
      ) : (
        likedProperties.map((property) => (
          <div key={property.id} className="property-item">
            <h2>{property.name}</h2>
            <p>{property.location}</p>
            <p>${property.price} per night</p>
            <p>Amenities: {property.amenities.join(', ')}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default App;
