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



