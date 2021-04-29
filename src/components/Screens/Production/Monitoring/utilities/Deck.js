import React from "react";
import CardWithoutFooter from "../../../../UI/Card/CardWithoutFooter/CardWithoutFooter";
import HorizontalCards from "../../../../UI/Cards/HorizontalCards/HorizontalCards";

import groupData from "../../../../../utils/groupDataByDate";
import _ from "lodash";
import { ReactComponent as PowderGun } from "../../../../../assets/svg/powderGun.svg";
import { ReactComponent as Runtime } from "../../../../../assets/svg/runtime.svg";
import { ReactComponent as Stop } from "../../../../../assets/svg/stop.svg";

// Unpacking some methods
const { filterArrayByObjectProperty, getTotalValueFromArray } = groupData;

// Data validation
const assertData = (data) => {
  // Check is no data from server
  if ((data === false) || _.isEmpty(data)) {
    return false;
  }
  return true;
};

// Process data for deck component
const processDataDeck = (data, fallback) => {
  if (!assertData(data)) {
    return fallback;
  }

  /**
   * Mapping y, y2, y3 values (Data must contain object with such keys!)
   * Otherwise, code guards are needed
   */
  const objectKeys = ["y", "y2", "y3"];
  const filteredData = objectKeys.map(key => filterArrayByObjectProperty(data,key));
  const dataDeck = filteredData.map(el => getTotalValueFromArray(el));
  const [totalHours, sprayedHours, startStopTimes] = dataDeck;

  return { totalHours, sprayedHours, startStopTimes };
};

const Deck = ({ data, }) => {
  /**
   * Data is an array, which contains objects with a 
   * structure as {timestamp, value, value2, value3}
   * [y]: Total hours
   * [y2]: Sprayed hours
   * [y3]: Number of times the system started / stopped production
   */
  const fallbackDataDeck = {
    totalHours: 0,
    sprayedHours: 0,
    startStopTimes: 0
  }
  const dataDeck = processDataDeck(data, fallbackDataDeck);
  const { totalHours, sprayedHours, startStopTimes } = dataDeck;

  // Configuratio for each card in deck
  const configDeck = [
    {
      id: "runtime",
      icon: <Runtime />,
      units: "h",
      value: totalHours
    },
    {
      id: "sprayTime",
      icon: <PowderGun />,
      units: "h",
      value: sprayedHours
    },
    {
      id: "startStop",
      icon: <Stop />,
      units: "#",
      value: startStopTimes
    }
  ];

  // Card, Deck components
  const Cards = configDeck.map(el => <CardWithoutFooter {...el} />);
  const Deck = <HorizontalCards cards={Cards} />;

  return Deck;
};

export default Deck;


