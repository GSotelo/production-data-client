import React, { useState } from "react";
import Bar from "../../../../UI/Graph/Bar/Bar";
import Card from "../../../../UI/Card/CardWithFooter/CardWithFooter";
import Line from "../../../../UI/Graph/Line/Line";
import RadioGroup from "../../../../UI/RadioGroup/Custom/TwoRadioGroup";
import { ReactComponent as Average } from "../../../../../assets/svg/average.svg";

import styles from "./CustomElements.module.css";
import processDataDeck from "../../../../../utils/processDataDeck";
import groupData from "../../../../../utils/groupDataByDate";
import { formatDate, createDateObject } from "../../../../../utils/time";
import _ from "lodash";

const { setFooterLabel, setFooterValue } = processDataDeck;
const { filterArrayByObjectProperty, getAverage } = groupData;

/**
 * General notes:
 * The following objects are used to
 * customize graph templates (Line, 
 * Bar, Pie), which can be found in the 
 * UI folder. The graph templates are 
 * based on nivo library ;)
 */

/**
 * [layoutCCD]: Layout for "Color change duration" trend (location: bottom)
 */
const layoutCCD = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Time (min)"
};

/**
 * [layoutCCQL]: Layout for "Quickest / Longest color change" bars (location: top)
 */
export const layoutCCQL = {
  colors: ["#005293", "#eeab00"],
  indexBy: "date",
  itemWidth: 100,
  keys: ["Quickest", "Longest"],
  translateX: 0,
  xtitle: "Date",
  ytitle: "Time (min)"
};

/**
 * @param {*} data Data from server
 * @returns Boolean. True: Data is valid. Otherwise, false
 */
const assertData = (data) => {
  // Check is no data from server
  if ((data === false) || _.isEmpty(data)) {
    return false;
  }
  return true;
};

/**
 * @param {*} data Data from server
 * @param {*} id Id of UI component
 * @param {*} fallback If no data to display,then send fallback data
 * @param {*} timeRange Time range used to extract data
 * @param {*} assertData Evaluates if data is according to what is expected
 * @returns 
 */
const processLineData = (data, id, fallback, timeRange, assertData) => {
  if (!assertData(data)) {
    return fallback;
  }

  let label;
  if (id === "CCD") {
    label = "Duration";
  }

  // If data is provided, then give format as defined in "Line" component
  const { currentData } = groupData.run(data, fallback, timeRange);
  const processedData = [{ id: label, data: currentData }];
  return processedData;
};


const processGroupedBarData = (data, fallback, timeRange, assertData) => {
  // Each element in the "data" array is structured as : x (timestamp), y(quickest CC), y2(longest CC)
  if (!assertData(data)) {
    return fallback;
  }

  const { currentData } = groupData.run(data, fallback, timeRange);

  const barData = _.map(currentData, ({ x, y, y2 }) => (
    {
      //date: formatDate(x),
      date: createDateObject(x).format('YYYY/MM/DD HH:mm'),
      Quickest: y,
      Longest: y2
    }
  ));

  return barData;
};

/**
 * 
 * @param {*} data Data from server
 * @param {*} id Id of UI component
 * @param {*} fallback If no data to display,then send fallback data
 * @param {*} timeRange Time range used to extract data
 * @param {*} assertData Evaluates if data is according to what is expected
 * @returns 
 */
const processCardData = (data, variable, units, fallback, timeRange, assertData) => {
  // Data validation
  if (!assertData(data)) {
    return fallback;
  }

  // If data is okay, then unpack it
  const { prevData, currentData } = groupData.run(data, fallback, timeRange);

  /**
   * Extracting "y" values from "prevData", "currentData"
   * The arrays contain objects with structure as {x:"2021-04-19T23:58:00.000Z", y:5}
   * Before running any metrics, save all values in separate arrays
   */
  const valuesCurrentData = filterArrayByObjectProperty(currentData, variable);
  const valuesPrevData = filterArrayByObjectProperty(prevData, variable);

  // Metrics calculation
  const currentAvg = getAverage(valuesCurrentData);
  const prevAvg = getAverage(valuesPrevData);
  const cardFooterLabel = setFooterLabel(timeRange, currentAvg, prevAvg);
  const cardFooterValue = setFooterValue(timeRange, prevAvg, units);

  // Format data
  const cardData = {
    icon: <Average />,
    value: currentAvg,
    label: cardFooterLabel,
    previousValue: cardFooterValue,
    units
  };

  return cardData;
};

const LineBarCardChart = ({ data, id, timeRange }) => {
  // General stuff
  let lineData, barData, propsCard, argsCardData, options;

  // State management (hooks)
  const [activeRadioButton, setActiveRadioButton] = useState(1);

  // Track radio buttons state
  const onChange = (e) => {
    setActiveRadioButton(e.target.value);
  };

  // Fallback data for all components
  const fallbackLineData = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  const fallbackCardData = {
    icon: <Average />,
    value: -1,
    label: "Not available",
    previousValue: -1,
    units: "min"
  };

  const fallbackGroupedBarData = [
    {
      "date": formatDate(new Date()),
      "Quickest": 0,
      "Longest": 0
    }
  ];

  // Target element by id
  const isCCQL = (id === "CCQL");
  const isCCD = (id === "CCD");

  if (isCCD) {
    // Arguments for "processCardData" function
    const units = "min";
    const variable = "y";
    argsCardData = [data, variable, units, fallbackCardData, timeRange, assertData];

    // Line data
    const argsLineData = [data, id, fallbackLineData, timeRange, assertData];
    lineData = processLineData(...argsLineData);
  }

  if (isCCQL) {
    // Arguments for "processCardData" function
    const units = "min";
    const variable = activeRadioButton === 1 ? "y" : "y2";
    argsCardData = [data, variable, units, fallbackCardData, timeRange, assertData];

    // Radiobutton options
    options = [
      {
        value: 1,
        description: "Quick"
      },
      {
        value: 2,
        description: "Long"
      }
    ];

    // Bar data
    const argsBarData = [data, fallbackGroupedBarData, timeRange, assertData];
    barData = processGroupedBarData(...argsBarData);
  }

  // Car data
  propsCard = processCardData(...argsCardData);

  return (
    <div className={styles.lineBarCard}>
      <div className={styles.left}>
        {isCCD && <Line {...layoutCCD} data={lineData} />}
        {isCCQL && <Bar {...layoutCCQL} data={barData} />}
      </div>

      <div className={styles.right}>
        {
          isCCQL &&
          (
            <div className={styles.radioGroup}>
              <RadioGroup options={options} onChange={onChange} />
            </div>
          )
        }
        <div className={styles.card}><Card {...propsCard} /></div>
      </div>
    </div>
  );
};

export default LineBarCardChart;