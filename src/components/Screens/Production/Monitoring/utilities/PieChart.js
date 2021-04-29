import React from "react";
import Pie from "../../../../UI/Graph/Pie/Pie";

import groupData from "../../../../../utils/groupDataByDate";
import _ from "lodash";

const { filterArrayByObjectProperty, getTotalValueFromArray } = groupData;

/**
 * General notes:
 * The following objects are used to
 * customize graph templates (Line, 
 * Bar, Pie), which can be found in the 
 * UI folder. The graph templates are 
 * based on nivo library ;)
 */

// Data validation
const assertData = (data) => {
  // Check is no data from server
  if ((data === false) || _.isEmpty(data)) {
    return false;
  }
  return true;
};

// Process data for Pie component
const processDataPie = (data, fallback, keys) => {
  if (!assertData(data)) {
    return fallback;
  }

  // Data must contain objects with such keys
  const filteredData = keys.map(key => filterArrayByObjectProperty(data, key));
  return filteredData.map(el => getTotalValueFromArray(el));
};

const PieChart = ({ data, id }) => {
  let fallbackDataPie, labels, keys;

  if (id === "SM") {
    keys = ["y", "y2", "y3"];
    labels = ["Automatic", "Manual", "Idle"];
    fallbackDataPie = [0, 0, 0]; // [automatic, manual, idle]
  }

  if (id === "SYS") {
    keys = ["y", "y2", "y3", "y4"];
    labels = ["Production", "System fault", "Color change", "Stand by"];
    fallbackDataPie = [0, 0, 0, 0]; // [production, system fault, color change, stand by]
  }

  const processedData = processDataPie(data, fallbackDataPie, keys);
  const dataPie = labels.map((el, index) => (
    {
      label: el,
      id: el.toLowerCase(),
      value: processedData[index]
    }
  ));

  return (
    <Pie data={dataPie} />
  );
};

export default PieChart;