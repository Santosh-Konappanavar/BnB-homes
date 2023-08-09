import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReservations } from '../redux/ReservationsSlice';
import { fetchCityData } from '../redux/city/citySlice';

export default function Reserve() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const navigate = useNavigate();

  const { homeId } = useParams();
  const homes = useSelector((state) => state.homes.homes);
  const selectedHome = homes.find((home) => home.id === parseInt(homeId));
  const cityData = useSelector((state) => state.city.data);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCityData());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCity);
    const reservation = {

      start_date: startDate,
      end_date: endDate,
      city_id: selectedCity,
      home_id: homeId,
    };
    console.log(reservation);
    try {
      await dispatch(addReservations(reservation));
      console.log('Reservation submitted successfully');
      navigate('/Reservations');
    } catch (error) {
      console.error('Error submitting reservation:', error);
      console.log('Response:', error.response);
    }
  };

  return (
    <form className="p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 bg-green-200 p-2 rounded-md">
        Reservation For &nbsp;
        {selectedHome && (
          <span className="animate-pulse">
            {selectedHome.name.toUpperCase()}
          </span>
        )}
      </h2>
      <div className="mb-4">
        <label htmlFor="startDate" className="block font-medium">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block font-medium">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="city" className="block font-medium">
          Select City
        </label>
        <select
          id="city"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Select a city</option>
          {cityData.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        onClick={handleSubmit}
      >
        Reserve
      </button>
    </form>
  );
}
