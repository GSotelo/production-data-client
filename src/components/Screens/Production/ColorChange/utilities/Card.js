import React from "react";
import CardWithoutFooter from "../../../../UI/Card/CardWithoutFooter/CardWithoutFooter";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";
import styles from "./CustomElements.module.css";

/**
 * This component is a customization of "CardWithoutFooter".
 * Main focus here is to create the card component for
 * number of color changes aborted (CCA). I do this in a 
 * separate file because I don't want to populate the main 
 * flow of the screen with configuration data for inner
 * components.
 */
const Card = ({ data }) => {
  const propsCard = {
    icon: <Total />,
    value:21
  }
  console.log("DATA IN CARD: ", data);

  return (
    <div className={styles.cardCCA}>
      <CardWithoutFooter {...propsCard} />
    </div>
  );
}

export default Card;