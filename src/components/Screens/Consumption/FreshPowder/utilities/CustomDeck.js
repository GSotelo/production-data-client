import React from "react";
import Card from "../../../../UI/Card/CardWithFooter/CardWithFooter";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";
import { ReactComponent as Average } from "../../../../../assets/svg/average.svg";


import styles from "./CustomDeck.module.css";

// export const HorizontalDeck = ({ deck }) => (
//   <div className={styles.horizontalDeck}>
//     {
//       deck.map(card => {
//         if (card.icon === "total") card.icon = <Total />
//         if (card.icon === "average") card.icon = <Average />
//         return (
//           <div className={styles.cardBox}>
//             <Card
//               {...card}
//             />
//           </div>
//         )
//       }
//       )
//     }
//   </div>
// );

const Deck = ({ orientation, deck }) => {
  const customStyle = orientation === "horizontal" ? styles.horizontalDeck : styles.verticalDeck
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
}

export default Deck;



