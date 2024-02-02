import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState('Jaipur');
  const [thisLocation, setLocation] = useState('');
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24',
        location: place,
        contentType: 'json',
        unitGroup: 'metric',
        shortColumnNames: 0,
      },
      headers: {
        'X-RapidAPI-Key':'532d755ec3mshffb939de4af68dcp18de70jsne9978c560bd9', // Replace with your actual key
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const thisData = Object.values(response.data.locations)[0];
      setLocation(thisData.address);
      setValues(thisData.values);
      setWeather(thisData.values[0]);
      setError(null); // Reset error if it was previously set
    } catch (e) {
      console.error(e);
      setError('Error fetching weather data. Please try again.'); // Set a user-friendly error message
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider value={{
      weather,
      setPlace,
      values,
      thisLocation,
      place,

     
      
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
