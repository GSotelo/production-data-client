import React from "react";
import CardWithoutFooter from "../../../../UI/Card/CardWithoutFooter/CardWithoutFooter";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";

import styles from "./CustomElements.module.css";
import _ from "lodash";

/**
 * 
 * @param {*} data Array of objects must have a structure as {x:"2021-04-19T23:58:00.000Z", y:5}
 * @param {*} fallback If data process fails, then send fallback data
 * @returns 
 */
const processDataCard = (data, fallback) => {
  // If no data from server, data holds "false" as value. If not, holds an array of objects
  if (typeof data === "boolean" && !data) {
    return fallback;
  }
  return _.size(data);
};

/**
 * This component is a customization of "CardWithoutFooter".
 * Main focus here is to create the card component for
 * number of color changes aborted (CCA). I do this in a 
 * separate file because I don't want to populate the main 
 * flow of the screen with configuration data for inner
 * components.
 */
const Card = ({ data }) => {
  const value = processDataCard(data, 0);

  // Some props for card customization
  const propsCard = {
    icon: <Total />,
    value
  };

  return (
    <div className={styles.cardCCA}>
      <CardWithoutFooter {...propsCard} />
    </div>
  );
}

export default Card;