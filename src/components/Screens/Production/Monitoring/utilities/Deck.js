import React from "react";
import CardWithoutFooter from "../../../../UI/Card/CardWithoutFooter/CardWithoutFooter";
import HorizontalCards from "../../../../UI/Cards/HorizontalCards/HorizontalCards";

import groupData from "../../../../../utils/groupDataByDate";
import _ from "lodash";
import { ReactComponent as PowderGun } from "../../../../../assets/svg/powderGun.svg";
import { ReactComponent as Runtime } from "../../../../../assets/svg/runtime.svg";
import { ReactComponent as Stop } from "../../../../../assets/svg/stop.svg";


const { filterArrayByObjectProperty, getTotalValueFromArray } = groupData;


const assertData = (data) => {
  // Check is no data from server
  if ((data === false) || _.isEmpty(data)) {
    return false;
  }
  return true;
};

const processDataDeck = (data, fallback) => {
  if (!assertData(data)) {
    return fallback;
  }

  const totalHours = _.map(data, "y");
  console.log(totalHours);
};

const Deck = ({ data, }) => {
  /**
   * Data is an array, which contains objects with a 
   * structure as {timestamp, value, value2, value3}
   * [y]: Total hours
   * [y2]: Sprayed hours
   * [y3]: Number of times the system started / stopped production
   */
  const configDeck = [
    {
      id: "runtime",
      icon: <Runtime />,
      units: "h",
      value: 47
    },
    {
      id: "sprayTime",
      icon: <PowderGun />,
      units: "h",
      value: 40
    },
    {
      id: "startStop",
      icon: <Stop />,
      units: "#",
      value: 40
    }
  ];

  const foo = processDataDeck(data, false);

  const Cards = configDeck.map(el => <CardWithoutFooter {...el} />);
  const Deck = <HorizontalCards cards={Cards} />;

  return Deck;
};

export default Deck;


