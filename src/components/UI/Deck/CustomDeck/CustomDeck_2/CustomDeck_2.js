import React from "react";
import Card from "../../../Card/CardWithFooter/CardWithFooter";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";
import { ReactComponent as Average } from "../../../../../assets/svg/average.svg";

import styles from "./CustomDeck_2.module.css";

const Deck = ({ orientation, deck }) => {
  const customStyle = orientation === "horizontal" ? styles.horizontalDeck : styles.verticalDeck;
  return (
    <div className={customStyle}>
      {
        deck.map((card, index) => {
          if (card.icon === "total") card.icon = <Total />
          if (card.icon === "average") card.icon = <Average />
          return (
            <div className={styles.cardBox} key={index}>
              <Card
                {...card}
              />
            </div>
          )
        }
        )
      }
    </div>

  );
};

export default Deck;

/**
 * Data for deck: Big bag
 */
//  const dataDeckBB = [
//   {
//     icon: "total",
//     id: "bb_c1",
//     value: 798,
//     units: "kg",
//     label: "▲ Previous week:",
//     previousValue: "631 kg"
//   },
//   {
//     icon: "average",
//     id: "bb_c2",
//     value: 5,
//     units: "kg/h",
//     label: "▬ Previous week:",
//     previousValue: "5 kg/h"
//   }
// ];
// const graphBBD = <Deck orientation="vertical" deck={dataDeckBB} />;


export const NewDeck = ({ data, timeRange, units, orientation }) => {
  //const customStyle = orientation === "horizontal" ? styles.horizontalDeck : styles.verticalDeck;
  let customStyle;
  if(orientation === "h"){
    customStyle = styles.horizontalDeck;
  }

  if(orientation === "v"){
    customStyle = styles.verticalDeck;
  }

  const configDeck = [
    {
      id:"total",
      icon: <Total />,
      label: " label",
      previousValue: "prev value",
      units,
      value: "value",
    },
    {
      id:"average",
      icon: <Average />,
      label: " label",
      previousValue: "prev value",
      units,
      value: "value",
    },
  ];

  return (
    <div className={customStyle}>
      {
        configDeck.map(el => (
          <div
            className={styles.cardBox}
            key={el.id}
          >
            <Card {...el} />
          </div>
        ))
      }
    </div>
  );
};


