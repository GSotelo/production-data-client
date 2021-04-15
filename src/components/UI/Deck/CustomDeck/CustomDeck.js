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
 * which can be found on screens such as
 * A
 */
const Deck = ({ data, timeRange, units }) => {

  const { avgTimeRange, avgPrevTimeRange } = data.average;

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