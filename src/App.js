import React, { useState } from 'react';
import './App.css';


const initialProperties = [
  {
    id: 1,
    name: 'Cozy Cottage',
    price: 120,
    location: 'New York',
    amenities: ['Wi-Fi', 'Kitchen', 'Parking'],
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Modern Apartment',
    price: 200,
    location: 'San Francisco',
    amenities: ['Wi-Fi', 'Air Conditioning', 'Gym'],
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Beach House',
    price: 300,
    location: 'Miami',
    amenities: ['Wi-Fi', 'Pool', 'Beach Access'],
    image: 'https://via.placeholder.com/150',
  },
  // Add more properties as needed
];

const App = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [likedProperties, setLikedProperties] = useState([]);

  const handleSearch = () => {
    const filteredProperties = initialProperties.filter((property) => {
      return (
        (!location || property.location.toLowerCase().includes(location.toLowerCase())) &&
        (!minPrice || property.price >= minPrice) &&
        (!maxPrice || property.price <= maxPrice)
      );
    });
    setProperties(filteredProperties);
  };

  const handleLike = (id) => {
    setLikedProperties((prev) => {
      if (prev.includes(id)) {
        return prev.filter((likedId) => likedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleBook = (property) => {
    alert(`Booking ${property.name} for ${guests} guests from ${startDate} to ${endDate}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Airbnb Clone</h1>
      </header>

      <main className="App-main">
        <div className="search-bar">
          <h2>Search Properties</h2>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="property-list">
          {properties.map((property) => (
            <div key={property.id} className="property-item">
              <img src={property.image} alt={property.name} />
              <h3>{property.name}</h3>
              <p>Location: {property.location}</p>
              <p>Price: ${property.price} per night</p>
              <p>Amenities: {property.amenities.join(', ')}</p>
              <button onClick={() => handleLike(property.id)}>
                {likedProperties.includes(property.id) ? 'Unlike' : 'Like'}
              </button>
              <button onClick={() => handleBook(property)}>Book Now</button>
            </div>
          ))}
        </div>
      </main>

      <footer className="App-footer">
        <h2>Liked Properties</h2>
        <ul>
          {initialProperties
            .filter((property) => likedProperties.includes(property.id))
            .map((property) => (
              <li key={property.id}>{property.name}</li>
            ))}
        </ul>
      </footer>
    </div>
  );
};

export default App;

