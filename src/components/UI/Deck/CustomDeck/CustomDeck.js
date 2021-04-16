import React, { Fragment } from "react";
import Card from "../../Card/CustomCard/CustomCard";
import HorizontalCards from "../../Cards/HorizontalCards/HorizontalCards";

import processDataDeck from "../../../../utils/processDataDeck";

const { setFooterLabel, setFooterValue } = processDataDeck;

/**
 * This component was designed to work
 * in conjuntion with "CustomCard" component.
 * This component renders deck elements to
 * describe average, max value, min value cards,
 * which can be found on screens as:
 * "Air pressure"
 * "Humidity and temperature"
 * "Electricity and air"
 */
const Deck = ({ data, timeRange, units }) => {
  // "data" structure is defined by the state object for deck elements
  const { avgTimeRange, avgPrevTimeRange } = data.average;

  // Helps to configure each "Card" element
  const configDeck = [
    {
      label: setFooterLabel(timeRange, avgTimeRange, avgPrevTimeRange),
      previousValue: setFooterValue(timeRange, avgPrevTimeRange, units),
      type: 1,
      value: avgTimeRange,
      units
    },
    {
      type: 2,
      value: data.maxValue,
      units
    },
    {
      type: 3,
      value: data.minValue,
      units
    }
  ];
  const Cards = configDeck.map(el => <Card {...el} />);

  return (
    <>
      <HorizontalCards cards={Cards} />
    </>
  );

};

export default Deck;