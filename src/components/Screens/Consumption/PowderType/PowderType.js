import React, { Component } from "react";
import { Row, Col } from "antd";

import styles from "./PowderType.module.css";

// TEST
import GraphContainer from "../../../Container/GraphContainer";
import { propsCPT, propsCPTT } from "./utilities/props";
import CustomChart from "./utilities/CustomChart";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import Table from "../../../UI/Table/MaterialUI/Table";




import { GraphContext } from "../../../Context/GraphContext";
import { connectServer } from "./utilities/connectServer";



/**
 * dataCPT1: Data for powder consumption per type - 1 (CPT1)
 * graphCPT1: Graph for powder consumption per type - 1 (CPT1)
 */
const dataCPT1 = [
  {
    id: "Powder",
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 7 },
      { x: '2021-04-13T23:59:00.000Z', y: 3 },
      { x: '2021-05-13T23:59:00.000Z', y: 7 },
      { x: '2021-06-13T23:59:00.000Z', y: 9 },
    ]
  }
];
const graphCPT1 = <CustomChart id="CPT1" data={dataCPT1} />

/**
 * dataCPT2: Data for powder consumption per type - 2 (CPT2)
 * graphCPT2: Graph for powder consumption per type - 2 (CPT2)
 */
const dataCPT2 = [
  {
    id: "Powder",
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 17 },
      { x: '2021-04-13T23:59:00.000Z', y: 23 },
      { x: '2021-05-13T23:59:00.000Z', y: 17 },
      { x: '2021-06-13T23:59:00.000Z', y: 19 },
    ]
  }
];
const graphCPT2 = <CustomChart id="CPT2" data={dataCPT2} />

// Dropdown options: Sprayed powder calculated recipe
const optionsCPT1 = [
  { key: 1, text: "RAL1", value: 1 },
  { key: 2, text: "RAL2", value: 2 },
  { key: 3, text: "RAL3", value: 3 },
  { key: 4, text: "RAL4", value: 4 }
];
// Dropdown: Sprayed powder calculated recipe
const dropdownCPT1 = <Dropdown options={optionsCPT1} />
// Dropdown: Sprayed powder calculated recipe
const dropdownCPT2 = <Dropdown options={optionsCPT1} />

// Data for table. It should be linked to state 
const rows = [
  { id: 1, type: "2021/03/17", consumption: 5.7 },
  { id: 2, type: "2021/03/18", consumption: 5.3 },
  { id: 3, type: "2021/03/19", consumption: 5.6 },
  { id: 4, type: "2021/03/20", consumption: 4.3 },
  { id: 5, type: "2021/03/21", consumption: 4.7 },
  { id: 6, type: "2021/03/22", consumption: 5.1 },
  { id: 7, type: "2021/03/23", consumption: 5.4 },
  { id: 8, type: "2021/03/24", consumption: 5.9 },
  { id: 9, type: "2021/03/25", consumption: 4.8 },
  { id: 10, type: "2021/03/26", consumption: 4.9 },
  { id: 11, type: "2021/03/27", consumption: 4.1 },
  { id: 12, type: "2021/03/28", consumption: 5.9 },
  { id: 13, type: "2021/03/29", consumption: 6.2 },
  { id: 14, type: "2021/03/30", consumption: 6.7 },
  { id: 15, type: "2021/04/17", consumption: 5.7 },
  { id: 16, type: "2021/04/18", consumption: 5.3 },
  { id: 17, type: "2021/04/19", consumption: 5.6 },
  { id: 18, type: "2021/04/20", consumption: 4.3 },
  { id: 19, type: "2021/04/21", consumption: 4.7 },
  { id: 20, type: "2021/04/22", consumption: 5.1 },
  { id: 21, type: "2021/04/23", consumption: 5.4 },
  { id: 22, type: "2021/04/24", consumption: 5.9 },
  { id: 23, type: "2021/04/25", consumption: 4.8 },
  { id: 24, type: "2021/04/26", consumption: 4.9 },
  { id: 25, type: "2021/04/27", consumption: 4.1 },
  { id: 26, type: "2021/04/28", consumption: 5.9 },
  { id: 27, type: "2021/04/29", consumption: 6.2 },
  { id: 28, type: "2021/04/30", consumption: 6.7 },
  { id: 29, type: "2021/05/17", consumption: 5.7 },
  { id: 30, type: "2021/05/18", consumption: 5.3 },
  { id: 31, type: "2021/05/19", consumption: 5.6 },
  { id: 32, type: "2021/05/20", consumption: 4.3 },
  { id: 33, type: "2021/05/21", consumption: 4.7 },
  { id: 34, type: "2021/05/22", consumption: 5.1 },
  { id: 35, type: "2021/05/23", consumption: 5.4 },
  { id: 36, type: "2021/05/24", consumption: 5.9 },
  { id: 37, type: "2021/05/25", consumption: 4.8 },
  { id: 38, type: "2021/05/26", consumption: 4.9 },
  { id: 39, type: "2021/05/27", consumption: 4.1 },
  { id: 40, type: "2021/05/28", consumption: 5.9 },
  { id: 41, type: "2021/05/29", consumption: 6.2 },
  { id: 42, type: "2021/05/30", consumption: 6.7 }
];

class PowderType extends Component {
  constructor(props) {
    super(props);
    //  this.contextValueCPTT =

  }

  /**
   * [api]: Contains received data from express server
   * [dataTFPT]: Holds "powder_total_fresh.csv" data for trend element
   */
  state = {
    api: {
      dataCPT1: [],
      dataCPT2: []
    },
    currentTimeRange: {
      timeRangeCPT1: "week",
      timeRangeCPT2: "week"
    },
    currentDropdownValue: {
      dropdownCPT1: 1,
      dropdownCPT2: 2
    }
  }

  /**
   * Dropdown value property points to one specific recipe file
   */
  updateDropdownSelection = (e, { value }) => this.setState(prevState => {
    console.log("The value is: ", value);
    //const dataSelector = ` dropdownCPT${value}`;
    const nextUpdate = { ...prevState };
    nextUpdate.currentDropdownValue["dropdownCPT1"] = value;
    return { nextUpdate };
  })

  /**
   * [getDataFromServer]: Establish connection to express server via HTTP requests (GET, POST)
   * [id]: Helps to determine the correct endpoint, filename and axios instance
   * [timeRange]: It can be a string ("day", "week", "month") or an array of two "moment" objects
   */
   getDataFromServer = async (id, timeRange) => {
    /**
     * Contains response data from API. The data is formatted based on nivo library
     */
    const filteredData = await connectServer(id, timeRange);

    this.setState(prevState => {
      const dataSelector = `data${id}`; // dataTFPT, dataSHDT, etc...
      const currentTimeRange = `timeRange${id}`; // timeRangeTFPT, timeRangeSHDT, etc...

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  render() {
    console.log("dropdown", this.state.currentDropdownValue);
    const graphCPT1 = <CustomChart id="CPT1" data={dataCPT1} />
    const contextValueCPT1 = { 
      id: "CPT1", 
      stateDropdown:this.state.currentDropdownValue.dropdownCPT1,
      getDataFromServer:this.getDataFromServer,
      updateDropdownSelection:this.updateDropdownSelection,
     }

  
    return (
      <Row className={styles.powderType}>
        <Col className={styles.left}>

          <div className={styles.top}>
            <GraphContext.Provider value={contextValueCPT1}>
              <GraphContainer {...propsCPT} dropdown={dropdownCPT1} graph={graphCPT1} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            {/* <GraphContext.Provider>
              <GraphContainer {...propsCPT} dropdown={dropdownCPT2} graph={graphCPT2} />
            </GraphContext.Provider> */}
            <GraphContainer {...propsCPT} dropdown={dropdownCPT2} graph={graphCPT2} />
          </div>
        </Col>

        <Col className={styles.right}>
          <Table rows={rows} {...propsCPTT} />
        </Col>
      </Row>
    );
  }
}

export default PowderType;