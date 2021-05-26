import React from "react";
import Line from "../../../../UI/Graph/Line/Line";

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
 * [layoutCS]: Layout for coated surface trend
 */
const layoutCS = {
  colors: "#86a315",
  enableArea: true,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Coated surface (sqm)"
};

/**
 * [layoutCVS]: Layout for conveyor speed trend
 */
const layoutCVS = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Speed(m/h)"
};

/**
 * [layoutCP]: Layout for coated parts trend
 */
const layoutCP = {
  colors: "#86a315",
  enableArea: false,
  translateX: -30,
  xtitle: "Date",
  ytitle: "Coated parts (#)"
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
const processLineData = (data, id, fallback, assertData) => {
  let legend;
  if (!assertData(data)) {
    return fallback;
  }

  if (id === "CVS") {
    legend = "Conveyor speed"
  }

  if (id === "CS") {
    legend = "Coated surface"
  }

  if (id === "CP") {
    legend = "Coated parts"
  }

  // If data is provided, then give format as defined in "Line" component
  const processedData = [{ id: legend, data }];
  return processedData;
};


const LineChart = ({ data, id }) => {
  let layout;

  /**
   * CS: Coated surface layout
   * CVS: Conveyor speed layout
   */
  if (id === "CS") layout = layoutCS;
  if (id === "CVS") layout = layoutCVS;
  if (id === "CP") layout = layoutCP;

  const defaultLineData = [
    {
      id,
      data: [{ x: new Date().toISOString(), y: 0 }]
    }
  ];

  const lineData = processLineData(data, id, defaultLineData, assertData);

  return (
    <Line {...layout} data={lineData} />
  );
};

export default LineChart;