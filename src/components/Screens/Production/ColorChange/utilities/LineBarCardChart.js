import React from "react";
import Bar from "../../../../UI/Graph/Bar/Bar";
import Card from "../../../../UI/Card/CardWithFooter/CardWithFooter";
import Line from "../../../../UI/Graph/Line/Line";
import { ReactComponent as Average } from "../../../../../assets/svg/average.svg";

import styles from "./CustomElements.module.css";

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

// Data for Color change duration
const lineData = [
  {
    id: 'Time',
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 17 },
      { x: '2021-04-13T23:59:00.000Z', y: 3 },
      { x: '2021-05-13T23:59:00.000Z', y: 17 },
      { x: '2021-06-13T23:59:00.000Z', y: 3 },
      { x: '2021-07-13T23:59:00.000Z', y: 17 },
    ]
  }
];

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
const propsLineChart = {
  id: "CCD",
  // lineData: dataCCD,
  cardData: {
    value: 18,
    label: "▬ Previous month",
    previousValue: "8 min"
  }
}
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

const LineBarCardChart = ({ data, id, timeRange }) => {
  // linechart tiene que generat set label set footer value, process deck
  // time range is important to display card with previous timeframe

  let layout;
  // Filtered data debe generar data para line / bar
  let filteredData = data*2;

  // Data for Color change duration
  const lineData = [
    {
      id: 'Time',
      data: [
        { x: '2021-03-13T23:59:00.000Z', y: 17 },
        { x: '2021-04-13T23:59:00.000Z', y: 3 },
        { x: '2021-05-13T23:59:00.000Z', y: 17 },
        { x: '2021-06-13T23:59:00.000Z', y: 3 },
        { x: '2021-07-13T23:59:00.000Z', y: 17 },
      ]
    }
  ];

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


  // Props for card element (la carta es la misma para line / bar)
  const propsCard = {
    units: "min",
    value: 6.5, //dinamico
    label: "▬ Previous month",  //dinamico
    previousValue: "2 min",  //dinamico
    icon: <Average />
  }

  // Implement default data for line and bar

  // Use "id" to choose a layout and data
  const isLineChart = (id === "CCD") ? true : false;
  const isBarChart = (id === "CCQL") ? true : false;

  return (
    <div className={styles.lineBar}>
      <div className={styles.left}>
        {isLineChart && <Line {...layoutCCD} data={lineData} />}
        {isBarChart && <Bar {...layoutCCQL} data={barData} />}
      </div>

      <div className={styles.right}>
        <Card {...propsCard} />
      </div>
    </div>
  );
};

export default LineBarCardChart;