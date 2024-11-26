import { useState } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [country, setCountry] = useState('');  
  const [capital, setCapital] = useState('');    
  const [currency, setCurrency] = useState('');
  const [error, setError] = useState('');        

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!country) {
      setError('Please enter a country name');
      return;
    }

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );
      const countryData = response.data[0];  

      setCapital(countryData.capital ? countryData.capital[0] : 'Not available');
      setCurrency(
        countryData.currencies ? Object.values(countryData.currencies)[0].name : 'Not available'
      );
      setError('');  
    } catch (err) {
      setError('Could not fetch data. Please check the country name and try again.');
      setCapital('');
      setCurrency('');
    }
  };

  return (
    <div className="App">
      <h1>Find Country Capital and Currency</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter country name"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {capital && (
        <div>
          <h2>Country Information:</h2>
          <p><strong>Capital:</strong> {capital}</p>
          <p><strong>Currency:</strong> {currency}</p>
        </div>
      )}
    </div>
  );
}

export default App;
