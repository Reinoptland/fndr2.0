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
  const [isChecked, setIsChecked] = useState();

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

  function handleCheckbox(value, id, boolean) {
    let keywordsCopy = { ...keywords };
    if (!boolean) {
      if (!keywordsCopy[id]) {
        setTopics((current) => {
          if (!current.includes(id)) return [...current, id];
          else return current;
        });

        keywordsCopy[id] = [];
        keywordsCopy[id].push(value);
        setKeywords(keywordsCopy);
      }
      if (!keywordsCopy[id].includes(value)) {
        keywordsCopy[id].push(value);
        setKeywords(keywordsCopy);
      }
    } else if (boolean) {
      let arr = [...keywordsCopy[id]];
      let index = arr.findIndex((el) => el == value);
      arr.splice(index, 1);
      setKeywords((current) => {
        return { ...current, [id]: arr };
      });
      if (arr.length == 0) {
        let copy = [...topics];
        let index = copy.findIndex((el) => el == id);
        copy.splice(index, 1);
        setTopics(copy);
      }
      //   console.log(arr);
    }
    // } else {
    //   console.log("is it?");

    // }
  }

  function submitFilterInput() {
    const copy = { ...listing };

    if (topics.join("") === "city") {
      const res = copy.agencies.filter((el, idx) => el.city === keywords.city);

      setListing({ agencies: res });
    }

    if (topics.join("") === "name") {
      const res = copy.agencies.filter((el, idx) => el.name === keywords.name);

      setListing({ agencies: res });
    }
    let count = 0;
    if (topics.join("") === "size") {
      let test1 = [];
      const res = copy.agencies.filter((agency, idx) => {
        let test = keywords.size.map((key) => {
          if (key == agency.companySize) {
            count++;
            console.log(
              key == agency.companySize,
              key,
              agency.companySize,
              count
            );
            // agency.companySize == key;
            test1.push(agency);
          }
        });
        // console.log(test);
        // return test;
      });
      console.log(test1);
      console.log(res);
      //   const res = copy.agencies.filter(
      //     (el, idx) => el.companySize === keywords.size[0]
      //   );

      setListing({ agencies: test1 });
    }

    if (topics.includes("city") && topics.includes("name")) {
      const res = copy.agencies.filter((el, idx) => {
        if (el.name === keywords.name && el.city === keywords.city) {
          return el;
        }
      });
      setListing({ agencies: res });
    }

    if (topics.includes("city") && topics.includes("size")) {
      const res = copy.agencies.filter((el, idx) => {
        if (el.companySize === keywords.size && el.city === keywords.city) {
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
        value={{
          submitFilterInput,
          getFilterCommand,
          deleteTopic,
          handleCheckbox,
        }}
      >
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  );
}

export default FilterProvider;
