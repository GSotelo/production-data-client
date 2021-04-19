import React, { Component } from "react";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import Table from "../../../UI/Table/MaterialUI/Table";
import  GraphContext  from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./PowderType.module.css";
import { connectServer } from "./utilities/connectServer";
import { propsTitleBarCPT, propsTableCPT } from "./utilities/props";

// TO BE MODIFIED LATER
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

  /**
   * [api]: Contains received data from express server
   * [dataTopCPT, dataBottomCPT]: Holds "consumption_powder_type_x.csv"
   * data for trend elements (top and bottom). The "x" represents the
   * recipe number
   */
  state = {
    api: {
      dataTopCPT: [],
      dataBottomCPT: []
    },
    currentTimeRange: {
      timeRangeTopCPT: "week",
      timeRangeBottomCPT: "week"
    },
    currentValueDropdown: {
      dropdownBottomCPT: 1,
      dropdownTopCPT: 1
    }
  }

  /**
   * 1. Fetch data when component mounts for the first time
   * 2. Triggers automatic updates every "x" milliseconds
   */
  async componentDidMount() {
    this.updateDataOnScreen();
    this.timerID = setInterval(() => this.updateDataOnScreen(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async updateDataOnScreen() {
    const { dropdownBottomCPT, dropdownTopCPT } = this.state.currentValueDropdown;
    const { timeRangeBottomCPT, timeRangeTopCPT } = this.state.currentTimeRange;
    
    const dataTopCPT = await connectServer(dropdownTopCPT, timeRangeTopCPT);
    const dataBottomCPT = await connectServer(dropdownBottomCPT, timeRangeBottomCPT);
    this.setState({ api: { dataTopCPT, dataBottomCPT } });
  }

  /**
   * Dropdown value property points to one specific recipe file
   */
  updateDropdownSelection = (e, { value }, id) => this.setState(prevState => {
    const dropdownSelector = `dropdown${id}`;
    const nextUpdate = { ...prevState };
    nextUpdate.currentValueDropdown[dropdownSelector] = value;
    return { nextUpdate };
  })

  /**
   * [getDataFromServer]: Establish connection to express server via HTTP requests (GET, POST)
   * [id]: Helps to determine the correct endpoint, filename and axios instance
   * [timeRange]: It can be a string ("day", "week", "month") or an array of two "moment" objects
   */
  getDataFromServer = async (id, timeRange) => {
    let currentValueDropdown;
    const { dropdownBottomCPT, dropdownTopCPT } = this.state.currentValueDropdown;

    /**
     * When users click any of the control buttons (day, week, month), the current value of the dropdown,
     * helps to target the correct recipe file (i.e. "consumption_powder_type_2.csv" ). Here we need
     * to be careful of using the correct dropdown value as there are two on the screen. Do not swap the  values
     * (top instead of bottom value and viceversa) 
     */
    if (id === "TopCPT") currentValueDropdown = dropdownTopCPT;
    if (id === "BottomCPT") currentValueDropdown = dropdownBottomCPT;

    /**
    * Contains response data from API. The data is formatted based on nivo library
    */
    const filteredData = await connectServer(currentValueDropdown, timeRange);

    this.setState(prevState => {
      const dataSelector = `data${id}`; // dataBottomCPT, dataTopCPT
      const currentTimeRange = `timeRange${id}`; // timeRangeBottomCPT, timeRangeTopCPT

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  render() {
    /**
     * Initialize context values for graph containers
     */
    const contextValueCPT1 = {
      id: "TopCPT",
      currentValueDropdown: this.state.currentValueDropdown.dropdownTopCPT,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownSelection
    };
    const contextValueCPT2 = {
      id: "BottomCPT",
      currentValueDropdown: this.state.currentValueDropdown.dropdownBottomCPT,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownSelection
    };

    /**
    * Data from express server
    */
    const { dataTopCPT, dataBottomCPT } = this.state.api;

    /**
     * When a LineChart component is created, the "id" must match the ones required
     * by the "LineChart" component. Refer to the component definition for more details
     */
    const graphCPT1 = <LineChart id="TopCPT" data={[{ id: "Powder type top", data: dataTopCPT }]} />
    const graphCPT2 = <LineChart id="BottomCPT" data={[{ id: "Powder type bottom", data: dataBottomCPT }]} />

    return (
      <Row className={styles.powderType}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueCPT1}>
              <GraphContainer {...propsTitleBarCPT} dropdown={dropdownCPT1} graph={graphCPT1} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueCPT2}>
              <GraphContainer {...propsTitleBarCPT} dropdown={dropdownCPT2} graph={graphCPT2} />
            </GraphContext.Provider>
          </div>
        </Col>
        <Col className={styles.right}>
          <Table rows={rows} {...propsTableCPT} />
        </Col>
      </Row>
    );
  }
}

export default PowderType;