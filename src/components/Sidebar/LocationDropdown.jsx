import { Select, Input, VStack } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import debounce from "lodash.debounce";

const LocationDropdown = ({ handleChange }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [specificPlace, setSpecificPlace] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://api.countrystatecity.in/v1/countries/IN/states", {
          headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATION_API_KEY },
        });
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = useCallback(async (stateCode) => {
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`,
        {
          headers: { "X-CSCAPI-KEY": import.meta.env.VITE_LOCATION_API_KEY },
        }
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  }, []);

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    if (stateName === selectedState) return;

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
    if (cityName === selectedCity) return;

    setSelectedCity(cityName);
    setSpecificPlace("");

    handleChange({
      target: { name: "location", value: `${cityName}, ${selectedState}` },
    });
  };

  const debouncedHandleChange = useCallback(
    debounce((value) => {
      handleChange({
        target: {
          name: "location",
          value: `${value}, ${selectedCity}, ${selectedState}`,
        },
      });
    }, 500),
    [selectedCity, selectedState]
  );

  const handleSpecificPlaceChange = (e) => {
    const placeName = e.target.value;
    setSpecificPlace(placeName);
    debouncedHandleChange(placeName);
  };

  return (
    <VStack spacing={2} w={{ base: "full", md: "220px" }}>
      <Select
        placeholder="Select State"
        value={selectedState}
        onChange={handleStateChange}
        h="50px"
        border="1px solid gray"
      >
        {states.map((state) => (
          <option key={state.iso2} value={state.name}>
            {state.name}
          </option>
        ))}
      </Select>

      {selectedState && (
        <Select
          placeholder="Select City"
          value={selectedCity}
          onChange={handleCityChange}
          h="50px"
          border="1px solid gray"
        >
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </Select>
      )}

      {selectedCity && (
        <Input
          placeholder="Enter Specific Place (e.g., MG Road, Sector 5)"
          value={specificPlace}
          onChange={handleSpecificPlaceChange}
          h="50px"
          border="1px solid gray"
        />
      )}
    </VStack>
  );
};

export default React.memo(LocationDropdown);