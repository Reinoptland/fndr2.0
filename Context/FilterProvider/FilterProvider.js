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
  const [topics, setTopics] = useState([]);

  function getFilterCommand(keyword, id) {
    setKeywords((current) => {
      return { ...current, [id]: keyword };
    });
    setTopics((current) => {
      if (!current.includes(id)) return current.push(id);
      else return current;
    });
    setListing(dataSet);
  }
  console.log(keywords, topics);

  function deleteTopic(topic) {
    const copy = [...topics];
    let index = copy.indexOf((el) => el == topic);
    copy.splice(index, 1);
    setTopics(copy);
  }

  function submitFilterInput() {
    const copy = { ...listing };

    if (topics.join("") === "city") {
      const res = copy.agencies.filter((el, idx) => el.city === keywords.city);
      console.log(res);
      setListing({ agencies: res });
    }

    if (topics.join("") === "name") {
      const res = copy.agencies.filter((el, idx) => el.name === keywords.name);

      setListing({ agencies: res });
    }

    if (topics.includes("city") && topics.includes("name")) {
      const res = copy.agencies.filter((el, idx) => {
        if (el.name === keywords.name && el.city === keywords.city) {
          return el;
        }
      });

      setListing({ agencies: res });
    }

    // setKeywords({});
    // setTopics([]);
  }
  //   console.log("listing", listing);
  return (
    <FilterContext.Provider value={listing}>
      <FilterUpdateContext.Provider
        value={{ submitFilterInput, getFilterCommand, deleteTopic }}
      >
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  );
}

export default FilterProvider;
