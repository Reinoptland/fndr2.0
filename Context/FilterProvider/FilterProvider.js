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
  const [isChecked, setIsChecked] = useState(false);

  function getFilterCommand(keyword, topic) {
    setKeywords((current) => {
      return { ...current, [topic]: keyword };
    });
  }

  function handleCheckbox(value, topic, boolean) {
    let keywordsCopy = { ...keywords };
    const keywordsKey = Object.keys(keywords);
    if (boolean) {
      if (!keywordsKey.includes(topic)) {
        keywordsCopy[topic] = [];
        keywordsCopy[topic].push(value);
        setKeywords(keywordsCopy);
      } else {
        keywordsCopy[topic].push(value);
        setKeywords(keywordsCopy);
      }
    } else if (!boolean) {
      if (keywords[topic].length > 1) {
        console.log("me");
        let arr = [...keywordsCopy[topic]];
        let index = arr.findIndex((el) => el == value);
        arr.splice(index, 1);
        setKeywords((current) => {
          return { ...current, [topic]: arr };
        });
      } else if (keywords[topic].length <= 1) {
        // setKeywords((current) => {
        //   const { topic, ...rest } = current;
        //   return rest;
        // });
        const copy = { ...keywords };
        delete copy.size;
        console.log(copy);
        setKeywords(copy);
      }
    }
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
          getFilterCommand,
          handleCheckbox,
          isChecked,
          keywords,
        }}
      >
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  );
}

export default FilterProvider;
