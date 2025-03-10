import { Select, Box, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LocationDropdown = ({ formValues, handleChange }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [specificPlace, setSpecificPlace] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
          headers: { "X-CSCAPI-KEY":  import.meta.env.VITE_LOCATION_API_KEY }, 
        });
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = async (stateCode) => {
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`,
        {
          headers: { "X-CSCAPI-KEY":  import.meta.env.VITE_LOCATION_API_KEY },
        }
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    setSelectedCity("");
    setCities([]);
    setSpecificPlace("");

    const stateData = states.find((state) => state.name === stateName);
    if (stateData) {
      fetchCities(stateData.iso2);
    }

    handleChange({ target: { name: "location", value: "" } });
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    setSpecificPlace("");

    handleChange({ target: { name: "location", value: `${cityName}, ${selectedState}` } });
  };

  const handleSpecificPlaceChange = (e) => {
    const placeName = e.target.value;
    setSpecificPlace(placeName);

    handleChange({ target: { name: "location", value: `${placeName}, ${selectedCity}, ${selectedState}` } });
  };

  return (
    <Box>
      {/* Select State */}
      <Select placeholder="Select State" value={selectedState} onChange={handleStateChange} h="50px" border="1px solid gray">
        {states.map((state) => (
          <option key={state.iso2} value={state.name}>
            {state.name}
          </option>
        ))}
      </Select>

      {/* Select City */}
      {selectedState && (
        <Select placeholder="Select City" value={selectedCity} onChange={handleCityChange} h="50px" border="1px solid gray">
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </Select>
      )}

      {/* Enter Specific Place */}
      {selectedCity && (
        <Input
          placeholder="Enter Specific Place (e.g., MG Road, Sector 5)"
          value={specificPlace}
          onChange={handleSpecificPlaceChange}
          h="50px"
          border="1px solid gray"
        />
      )}
    </Box>
  );
};

export default LocationDropdown;
