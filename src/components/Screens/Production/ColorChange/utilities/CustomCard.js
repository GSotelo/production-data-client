import React from "react";
import Card from "../../../../UI/Card/CardWithoutFooter/CardWithoutFooter";
import { ReactComponent as Total } from "../../../../../assets/svg/total.svg";
import styles from "./CustomElements.module.css";

const CustomCard = ({ value }) => {
  const propsCard = {
    icon: <Total />,
    value
  }
  return (
    <div className={styles.customCard}>
      <Card {...propsCard} />
    </div>
  );
}

export default CustomCard;