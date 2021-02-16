import React from "react";
import Line from "../../../../UI/Graph/Line/Line";
import Bar from "../../../../UI/Graph/Bar/Bar";
import Card from "../../../../UI/Card/CardWithFooter/CardWithFooter";
import { ReactComponent as Average } from "../../../../../assets/svg/average.svg";

import styles from "./CustomElements.module.css";

// Layout: Color change duration
const layoutCCD = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Time (min)"
};

// Layout: Quickest / Longest color change
export const layoutCCQL = {
  colors: ["#005293","#eeab00"],
  indexBy: "date",
  keys: ["Quickest CC","Longest CC"],
  translateX: 0,
  xtitle: "Date",
  ytitle: "Time (min)",
  itemWidth:100,
};

const CustomChart = ({ id, barData, cardData, lineData }) => {
  let layout;
  let data;

  // Props for card element
  const propsCard = {
    units: "min",
    value: cardData.value,
    label: cardData.label,
    previousValue: cardData.previousValue,
    icon: <Average />
  }

  // Use "id" to choose a layout and data
  if (id === "CCD") {
    layout = layoutCCD;
    data = lineData
  }

  if (id === "CCQL") {
    layout = layoutCCQL;
    data = barData
  }

  return (
    <div className={styles.customChart}>
      <div className={styles.top}>
        {lineData && <Line {...layout} data={data} />}
        {barData && <Bar {...layout} data={data} />}
      </div>

      <div className={styles.bottom}>
        <Card {...propsCard} />
      </div>
    </div>
  );
};

export default CustomChart;