import React, { Component } from 'react';
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import GraphContext from "../../../Context/GraphContext";
import LineChart from "./utilities/LineChart";
import { Row, Col } from "antd";

import styles from "./PowderType.module.css";
import processDataFromServer, { getDataForDropdown } from "./utilities/handlersServer";
import { setCurrentValueDropdown } from "./utilities/miscellaneous";
import {
  propsDropdownCPT,
  propsTableCPT,
  propsTitleBarCPTT
} from "./utilities/props";

// TEMPORAL
import Table from "../../../UI/Table/MaterialUI/Table";
import Foo from "./utilities/Table";
const tableRows = [
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
   * Class fields (Belong to the class itself. Prototype chain not affected) 
   * These fields are used by the server to set options for dropdown elements
   */
   optionsDropdownCPT = [{ key: 1, text: "T1", value: 1 }];

  /**
  * [api]: Contains received data from express server
  * [currentTimeRange]: Contains selected time frame for trend and deck elements
  * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
  * [dataBottomSPCTT, dataTopSPCTT]: Holds data for "consumption_powder_type_x.csv" 
  * The "x" represents recipe number
  */
  state = {
    api: {
      dataBottomSPCTT: [],
      dataTopSPCTT: [],
    },
    currentTimeRange: {
      currentTimeRangeBottomSPCTT: "week",
      currentTimeRangeTopSPCTT: "week",
    },
    currentValueDropdown: {
      currentValueDropdownBottomSPCTT: 1,
      currentValueDropdownTopSPCTT: 1,
    }
  }

  /**
   * 1. Fetch data when component mounts for the first time
   * 2. Triggers automatic updates every "x" milliseconds
   */
  async componentDidMount() {
    // Load options for dropdowns
    const fallbackOptionsDropdown = [{ key: 1, text: "T1", value: 1 }];
    this.optionsDropdownCPT = await getDataForDropdown("types", fallbackOptionsDropdown);

    // Set automatic updates
    this.updateDataOnScreen();
    this.timerID = setInterval(() => this.updateDataOnScreen(), 3600000);
  }

  // If component unmounts, then free memory resources
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * [updateDataOnScreen]: Trigger screen updates every "x" millisenconds
   */
  async updateDataOnScreen() {
    // Define id's to target all UI elements
    const { currentTimeRange, currentValueDropdown } = this.state;
    const ids = ["TopSPCTT", "BottomSPCTT"];

    // Get data for all elements
    const data = await Promise.all(ids.map(async (id) => {
      const valueDropdown = currentValueDropdown[`currentValueDropdown${id}`];
      const timeRange = currentTimeRange[`currentTimeRange${id}`];
      return await processDataFromServer(valueDropdown, id, timeRange);
    }));

    // Update state for all components
    this.setState(
      {
        api:
        {
          dataTopSPCTT: data[0],
          dataBottomSPCTT: data[1]
        }
      }
    );
  }

  /**
   * [updateDropdownState]: Update value of dropdown element
   * [id]: Helps to determine the correct dropdown element
   * [value]: Value of dropdown element
   * [e]: Synthetic event. The event is used internally by UI library 
   */
  updateDropdownState = (e, { value }, id) => this.setState(prevState => {
    const dropdownSelector = `currentValueDropdown${id}`;
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
    // Update value of selected dropdown
    const currentValueDropdown = this.state.currentValueDropdown[setCurrentValueDropdown(id)];

    /**
    * Response data from server API. The data is formatted 
    * based on nivo library. If an error comes up, then 
    * "dataFromServer" is "false". Though I can exit the 
    * function at this point, I'll let it continue. Trends and 
    * deck elements handle the event of no-data using fallback data 
    */
    const dataFromServer = await processDataFromServer(currentValueDropdown, id, timeRange);

    // Update state of all elements
    this.setState(prevState => {
      const dataSelector = `data${id}`;
      const currentTimeRange = `currentTimeRange${id}`;
      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = dataFromServer;
      return { nextUpdate };
    });
  }

  /**
  * @param {*} ids Arrays of ids (i.e "TopSPCTT", "BottomSPCTT")
  * @returns Array of context values for graphs
  */
  createContextValues = (ids) => {
    const { currentValueDropdown } = this.state;
    const { getDataFromServer, updateDropdownState } = this;
    const baseContextValue = { getDataFromServer, updateDropdownState };

    return ids.map(id => (
      {
        ...baseContextValue,
        id,
        currentValueDropdown: currentValueDropdown[`currentValueDropdown${id}`]
      }
    ));
  }

  render() {
    // Extract some class methods / fields
    const { createContextValues, optionsDropdownCPT } = this;

    // Data from express server
    const { dataBottomSPCTT, dataTopSPCTT } = this.state.api;

    // Current time range for elements
    //const { } = this.state.currentTimeRange;

    // Create context values
    const ids = ["TopSPCTT", "BottomSPCTT"];
    const contextValue = createContextValues(ids);

    // Table UI component
    // Add component

    // Dropdown UI components
    //const DropdownHS = <Dropdown {...propsDropdownCPT} />;
    const DropdownHS = <Dropdown options={optionsDropdownCPT} />;

    // Line chart UI components
    const LineChartBottomSPCTT = <LineChart id="BottomSPCTT" data={[{ id: "Recipe", data: dataBottomSPCTT }]} />;
    const LineChartTopSPCTT = <LineChart id="TopSPCTT" data={[{ id: "Total", data: dataTopSPCTT }]} />;

    return (
      <Row className={styles.powderType}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsTitleBarCPTT} graph={LineChartTopSPCTT} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[1]}>
              <GraphContainer {...propsTitleBarCPTT} graph={LineChartBottomSPCTT} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          {/* <Table data="data" rows={tableRows} {...propsTableCPT} /> */}
          <Foo data="EXPRESS DATA" {...propsTableCPT} />
        </Col>
      </Row>
    );
  }
}

export default PowderType;