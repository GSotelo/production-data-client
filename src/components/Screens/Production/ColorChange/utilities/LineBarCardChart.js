import React from "react";
import Bar from "../../../../UI/Graph/Bar/Bar";
import Card from "../../../../UI/Card/CardWithFooter/CardWithFooter";
import Line from "../../../../UI/Graph/Line/Line";
import { ReactComponent as Average } from "../../../../../assets/svg/average.svg";

import styles from "./CustomElements.module.css";
import processDataDeck from "../../../../../utils/processDataDeck";
import groupData from "../../../../../utils/groupDataByDate";
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
  keys: ["Quickest CC", "Longest CC"],
  translateX: 0,
  xtitle: "Date",
  ytitle: "Time (min)"
};



// Data for color change quickest longest
const barData = [
  {
    "date": "2021/01/01",
    "Quickest CC": 17,
    "Longest CC": 19
  },
  {
    "date": "2021/01/02",
    "Quickest CC": 17,
    "Longest CC": 20
  },
  {
    "date": "2021/01/03",
    "Quickest CC": 14,
    "Longest CC": 20
  },
  {
    "date": "2021/01/04",
    "Quickest CC": 13,
    "Longest CC": 21
  },
  {
    "date": "2021/01/05",
    "Quickest CC": 8,
    "Longest CC": 25
  },
  {
    "date": "2021/01/06",
    "Quickest CC": 4,
    "Longest CC": 22

  },
  {
    "date": "2021/01/07",
    "Quickest CC": 6,
    "Longest CC": 20
  },
  {
    "date": "2021/01/08",
    "Quickest CC": 8,
    "Longest CC": 22
  },
  {
    "date": "2021/01/09",
    "Quickest CC": 8,
    "Longest CC": 20
  },
  {
    "date": "2021/01/10",
    "Quickest CC": 18,
    "Longest CC": 23
  },
  {
    "date": "2021/01/11",
    "Quickest CC": 7,
    "Longest CC": 20
  },
  {
    "date": "2021/01/12",
    "Quickest CC": 11,
    "Longest CC": 24
  },
  {
    "date": "2021/01/13",
    "Quickest CC": 9,
    "Longest CC": 20
  },
  {
    "date": "2021/01/14",
    "Quickest CC": 9,
    "Longest CC": 23

  },
  {
    "date": "2021/01/15",
    "Quickest CC": 6,
    "Longest CC": 22
  },
  {
    "date": "2021/01/16",
    "Quickest CC": 18,
    "Longest CC": 20
  },
  {
    "date": "2021/01/17",
    "Quickest CC": 18,
    "Longest CC": 20
  },
  {
    "date": "2021/01/18",
    "Quickest CC": 7,
    "Longest CC": 17
  },
  {
    "date": "2021/01/19",
    "Quickest CC": 13,
    "Longest CC": 19
  },
  {
    "date": "2021/01/20",
    "Quickest CC": 9,
    "Longest CC": 15
  }
];


// Properties for color change duration graph
const propsBarChart = {
  id: "CCQL",
  // barData: dataCCQL,
  cardData: {
    value: 7,
    label: "▬ Previous month",
    previousValue: "6 min"
  }
}

/**
 * @param {*} data Data from server
 * @returns Boolean. True: Data is valid. Otherwise, false
 */
const assertData = (data) => {
  // If no data from server, then return false
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

  // If data is provided, then give format as defined in "Line" component
  const { currentData } = groupData.run(data, fallback, timeRange);
  const processedData = [{ id, data: currentData }];
  return processedData;
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
const processAvgCardData = (data, units,fallback, timeRange, assertData) => {
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
  const valuesCurrentData = filterArrayByObjectProperty(currentData, "y");
  const valuesPrevData = filterArrayByObjectProperty(prevData, "y");

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
    units:"min"
  };

  // Line component
  const argsLineData = [data, id, fallbackLineData, timeRange, assertData];
  const lineData = processLineData(...argsLineData);

  // Card component
  let propsCard;
  const units = "min";
  const argsCardData = [units, fallbackCardData, timeRange, assertData];

  if(id === "CCD"){
    propsCard = processAvgCardData(data, ...argsCardData);
  }

  if(id === "CCQL"){
    propsCard = processAvgCardData(data[1], ...argsCardData);
  }


  //const propsCard = processAvgCardData(...argsCardData);
  

  // PROCESSING FOR CCQL : DESIRED OUTPUT
  const barData = [
    {
      "date": "2021/01/01",
      "Quickest CC": 17,
      "Longest CC": 19
    },
    {
      "date": "2021/01/02",
      "Quickest CC": 17,
      "Longest CC": 20
    },
    {
      "date": "2021/01/03",
      "Quickest CC": 14,
      "Longest CC": 20
    },
    {
      "date": "2021/01/04",
      "Quickest CC": 13,
      "Longest CC": 21
    },
    {
      "date": "2021/01/05",
      "Quickest CC": 8,
      "Longest CC": 25
    },
    {
      "date": "2021/01/06",
      "Quickest CC": 4,
      "Longest CC": 22

    },
    {
      "date": "2021/01/07",
      "Quickest CC": 6,
      "Longest CC": 20
    },
    {
      "date": "2021/01/08",
      "Quickest CC": 8,
      "Longest CC": 22
    },
    {
      "date": "2021/01/09",
      "Quickest CC": 8,
      "Longest CC": 20
    },
    {
      "date": "2021/01/10",
      "Quickest CC": 18,
      "Longest CC": 23
    },
    {
      "date": "2021/01/11",
      "Quickest CC": 7,
      "Longest CC": 20
    },
    {
      "date": "2021/01/12",
      "Quickest CC": 11,
      "Longest CC": 24
    },
    {
      "date": "2021/01/13",
      "Quickest CC": 9,
      "Longest CC": 20
    },
    {
      "date": "2021/01/14",
      "Quickest CC": 9,
      "Longest CC": 23

    },
    {
      "date": "2021/01/15",
      "Quickest CC": 6,
      "Longest CC": 22
    },
    {
      "date": "2021/01/16",
      "Quickest CC": 18,
      "Longest CC": 20
    },
    {
      "date": "2021/01/17",
      "Quickest CC": 18,
      "Longest CC": 20
    },
    {
      "date": "2021/01/18",
      "Quickest CC": 7,
      "Longest CC": 17
    },
    {
      "date": "2021/01/19",
      "Quickest CC": 13,
      "Longest CC": 19
    },
    {
      "date": "2021/01/20",
      "Quickest CC": 9,
      "Longest CC": 15
    }
  ];

  return (
    <div className={styles.lineBarCard}>
      <div className={styles.left}>
        {(id === "CCD") && <Line {...layoutCCD} data={lineData} />}
        {(id === "CCQL") && <Bar {...layoutCCQL} data={barData} />}
      </div>

      <div className={styles.right}>
        <Card {...propsCard} />
      </div>
    </div>
  );
};

export default LineBarCardChart;