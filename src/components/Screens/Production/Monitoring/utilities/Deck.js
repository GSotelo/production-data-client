import React from "react";
import CardWithoutFooter from "../../../../UI/Card/CardWithoutFooter/CardWithoutFooter";
import HorizontalCards from "../../../../UI/Cards/HorizontalCards/HorizontalCards";

import { ReactComponent as PowderGun } from "../../../../../assets/svg/powderGun.svg";
import { ReactComponent as Runtime } from "../../../../../assets/svg/runtime.svg";
import { ReactComponent as Stop } from "../../../../../assets/svg/stop.svg";

const Deck = ({ data, }) => {
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

  const Cards = configDeck.map(el => <CardWithoutFooter {...el} />);
  const Deck = <HorizontalCards cards={Cards} />;

  return Deck;
};

export default Deck;


