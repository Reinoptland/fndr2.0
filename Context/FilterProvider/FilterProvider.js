import React, { useState, useContext } from "react";
import { dataSet } from "../../data/data";

const FilterContext = React.createContext();
const FilterUpdateContext = React.createContext();

export function useData() {
  return useContext(FilterContext);
}

export function useFilter() {
  return useContext(FilterUpdateContext);
}

function FilterProvider({ children }) {
  const [listing, setListing] = useState(dataSet);
  const [keywords, setKeywords] = useState({});

  function handleTextInput(keyword, topic) {
    setKeywords((current) => {
      return { ...current, [topic]: keyword };
    });
  }

  function handleCheckbox(value, topic, isChecked) {
    let keywordsCopy = { ...keywords };

    if (isChecked) {
      // when the topic is not present: add the topic
      if (!keywordsCopy[topic]) {
        keywordsCopy[topic] = [];
      }
      // add the value that was checked
      keywordsCopy[topic].push(value);
    } else {
      // remove the value that is unchecked from the topic
      keywordsCopy[topic] = keywordsCopy[topic].filter(
        (option) => option !== value
      );
      // when the topic is not longer present at all: remove it
      if (keywordsCopy[topic].length === 0) {
        delete keywordsCopy.size;
      }
    }

    setKeywords(keywordsCopy);
  }

  const filterFunctions = {
    name: (agency, name) => agency.name.includes(name),
    location: (agency, location) =>
      agency.city.includes(location) || agency.region.includes(location),
    size: (agency, size) => size.includes(agency.companySize),
  };

  function submitFilterInput() {
    const keysTofilterBy = Object.keys(keywords);
    const output = dataSet.agencies.filter((agency) => {
      return keysTofilterBy.every((key) => {
        const filterFunction = filterFunctions[key];
        const filterValue = keywords[key];
        return filterFunction(agency, filterValue);
      });
    });
    setListing({ agencies: output });
  }
  console.log(keywords);

  return (
    <FilterContext.Provider value={listing}>
      <FilterUpdateContext.Provider
        value={{
          submitFilterInput,
          handleTextInput,
          handleCheckbox,
          keywords,
        }}
      >
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  );
}

export default FilterProvider;
