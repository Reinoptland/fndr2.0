import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";
import { InfoCard, Image, Button } from "../../atoms";
import { useTheme } from "../../../Context/ThemeProvider/ThemeProvider";
import { useData } from "../../../Context/FilterProvider/FilterProvider";
import { usePagination } from "../../../Context/PaginationProvider/PaginationProvider";
const Card = (props) => {
  const darkTheme = useTheme();
  const pages = usePagination().pages;
  const cards = usePagination().cards;

  const data = useData();
  console.log(pages);
  const CARD_STYLE = {
    backgroundColor: darkTheme ? "var(--dark-blue)" : "white",
  };

  let arrData = data.agencies;
  let res = [];
  if (arrData) {
    for (let index = pages * 20; index < arrData.length; index++) {
      if (index < 20 * (cards + 1)) {
        res.push(
          <div
            key={arrData[index].name}
            className={styles.card}
            style={CARD_STYLE}
          >
            <Image img={arrData[index].eguideImageSrc} />

            <InfoCard
              label={arrData[index].name}
              variant="text"
              margin="mg-t-l"
            />
            <InfoCard
              label={arrData[index].region}
              variant="text"
              margin="mg-l"
            />

            <InfoCard
              label={arrData[index].city}
              variant="text"
              margin="mg-l"
            />
            <InfoCard
              label={arrData[index].companySize}
              variant="text"
              margin="mg-l"
            />
            <InfoCard
              label={arrData[index].website}
              variant="city"
              margin="mg-t-b-l"
            />
          </div>
        );
      }
    }
  } else res = <p>Error</p>;

  return (
    <>
      <div className={styles.cardContainer}>{res}</div>
    </>
  );
};

Card.propTypes = {};

export default Card;
