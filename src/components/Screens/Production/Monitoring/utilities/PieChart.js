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

/*System status data*/
const dataSystemStatus = [
  {
    "id": "production",
    "label": "Production",
    "value": 75
  },
  {
    "id": "system fault",
    "label": "System fault",
    "value": 16
  },
  {
    "id": "color change",
    "label": "Color change",
    "value": 15,
  },
  {
    "id": "standby",
    "label": "Standby",
    "value": 10,
  }
]

const dataSprayingMode = [
  {
    "id": "automatic",
    "label": "Automatic",
    "value": 70
  },
  {
    "id": "manual",
    "label": "Manual",
    "value": 20
  },
  {
    "id": "idle",
    "label": "Idle",
    "value": 10,
  }
]

// Data validation
const assertData = (data) => {
  // Check is no data from server
  if ((data === false) || _.isEmpty(data)) {
    return false;
  }
  return true;
};

// Process data for Pie component
const processDataPie = (data, fallback) => {
  if (!assertData(data)) {
    return fallback;
  }

  /**
   * Mapping y, y2, y3 values (Data must contain object with such keys!)
   * Otherwise, code guards are needed
   */
  const objectKeys = ["y", "y2", "y3"];
  const filteredData = objectKeys.map(key => filterArrayByObjectProperty(data, key));
  const dataPie = filteredData.map(el => getTotalValueFromArray(el));
  const [automatic, manual, idle] = dataPie;

  return { automatic, manual, idle };
};


const PieChart = ({ data, id }) => {

  console.log("DATA FOR PIE", data);
  let dataPie;

  /**
   * Data is an array, which contains objects with a 
   * structure as {timestamp, value, value2, value3}
   * [y]: Total hours
   * [y2]: Sprayed hours
   * [y3]: Number of times the system started / stopped production
   */
  const fallbackDataPieSM = {
    automatic: 0,
    manual: 0,
    idle: 0
  }


  const filteredData = processDataPie(data, fallbackDataPieSM);
  const { automatic, manual, idle } = filteredData;
  const dataPieSM = [
    {
      "id": "automatic",
      "label": "Automatic",
      "value": automatic
    },
    {
      "id": "manual",
      "label": "Manual",
      "value": manual
    },
    {
      "id": "idle",
      "label": "Idle",
      "value": idle
    }
  ]



  return (
    <Pie data={dataPieSM} />
  );
};

export default PieChart;