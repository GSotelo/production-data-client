import React from "react";
import Bar from "../../../../UI/Graph/Bar/Bar";

import _ from "lodash";

/**
 * General notes:
 * The following objects are used to
 * customize graph templates (Line, 
 * Bar, Pie), which can be found in the 
 * UI folder. The graph templates are 
 * based on nivo library ;)
 */

/**
 * [layoutLD]: Layout for line density (bar)
 */
export const layoutLD = {
  colors: "#e37222",
  indexBy: "date",
  keys: ["Coated parts"],
  translateX: -30,
  xtitle: "Date",
  ytitle: "Total(%)",
  itemWidth: 100
};

const dataLineDensityState = [
  {
    "date": "2021/01/01",
    "Coated parts": 18
  },
  {
    "date": "2021/01/02",
    "Coated parts": 12
  },
  {
    "date": "2021/01/03",
    "Coated parts": 4
  },
  {
    "date": "2021/01/04",
    "Coated parts": 13
  },
  {
    "date": "2021/01/05",
    "Coated parts": 9
  },
  {
    "date": "2021/01/06",
    "Coated parts": 9

  },
  {
    "date": "2021/01/07",
    "Coated parts": 6
  },
  {
    "date": "2021/01/08",
    "Coated parts": 18
  },
  {
    "date": "2021/01/09",
    "Coated parts": 8
  },
  {
    "date": "2021/01/10",
    "Coated parts": 12
  },
  {
    "date": "2021/01/11",
    "Coated parts": 14
  },
  {
    "date": "2021/01/12",
    "Coated parts": 13
  },
  {
    "date": "2021/01/13",
    "Coated parts": 9
  },
  {
    "date": "2021/01/14",
    "Coated parts": 4

  },
  {
    "date": "2021/01/15",
    "Coated parts": 36
  },
  {
    "date": "2021/01/16",
    "Coated parts": 18
  },
  {
    "date": "2021/01/17",
    "Coated parts": 12
  },
  {
    "date": "2021/01/18",
    "Coated parts": 4
  },
  {
    "date": "2021/01/19",
    "Coated parts": 13
  },
  {
    "date": "2021/01/20",
    "Coated parts": 9
  }
];


const BarChart = ({ data, id }) => {
  let layout;

  /**
   * CST: Line density layout
   */
  if (id === "LD") layout = layoutLD;

  const defaultBarData = [
    {
      date: new Date().toISOString(),
      "Coated parts": 0
    }
  ];

  /**
  *  If express server provides no data, then use the default data.
  */
  const useDefaultData = _.isEmpty(data);
  const barData = useDefaultData ? defaultBarData : dataLineDensityState;

  return (
    <Bar {...layout} data={barData} />
  );
};

export default BarChart;