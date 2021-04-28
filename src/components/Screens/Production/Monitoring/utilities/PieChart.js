import React from "react";

import Pie from "../../../../UI/Graph/Pie/Pie";

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

const PieChart = ({ data, id }) => {

  // const defaultLineData = [
  //   {
  //     id,
  //     data: [{ x: new Date().toISOString(), y: 0 }]
  //   }
  // ];

  const defaultPieData = [
    {
      "id": "production",
      "label": "Production",
      "value": 1
    }
  ]

  // Default data for pie
  const noData = false;

  /**
  *  If express server provides no data, then use the default one.
  */
  const pieData = noData ? defaultPieData : dataSystemStatus;

  // TEST
  const foo = id==="SYS"? dataSystemStatus:dataSprayingMode;

  return (
    <Pie data={foo} />
  );
};

export default PieChart;