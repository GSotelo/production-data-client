import React from "react";
import Bar from "../../../../UI/Graph/Bar/Bar";

import _ from "lodash";
import { formatDate } from "../../../../../utils/time";

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


const processBarData = (data, fallback, assertData) => {
  // Each element in the "data" array is structured as : x (timestamp), y(quickest CC), y2(longest CC)
  if (!assertData(data)) {
    return fallback;
  }

  const barData = _.map(data, ({ x, y }) => (
    {
      date: formatDate(x),
      "Coated parts": y
    }
  ));

  return barData;
};

const BarChart = ({ data, id }) => {
  let layout;

  /**
   * CST: Line density layout
   */
  if (id === "LD") layout = layoutLD;

  // If server provides no data, then use a default one
  const fallbackBarData = [
    {
      date: new Date().toISOString(),
      "Coated parts": 0
    }
  ];

  const barData = processBarData(data, fallbackBarData, assertData);

  return (
    <Bar {...layout} data={barData} />
  );
};

export default BarChart;