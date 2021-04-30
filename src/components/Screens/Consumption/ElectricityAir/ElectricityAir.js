import React, { Component } from "react";
import Deck from "../../../UI/Deck/CustomDeck/CustomDeck_1";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import GraphContext from "../../../Context/GraphContext";
import LineChart from "./utilities/LineChart";
import { Row, Col } from "antd";

import styles from "./ElectricityAir.module.css";
import { setCurrentValueDropdown } from "./utilities/miscellaneous";
import processDataFromServer, { getDataForDropdown } from "./utilities/handlersServer";
import {
  propsDropdownEC,
  propsDropdownAC,
  propsTitleBarACD,
  propsTitleBarACT,
  propsTitleBarECD,
  propsTitleBarECT
} from "./utilities/props";

class ElectricityAir extends Component {
  /**
  * Class fields (Belong to the class itself. Prototype chain not affected) 
  * These fields are used by the server to set options for dropdown elements
  */
  optionsDropdownEC = [{ key: 1, text: "EC1", value: 1 }];
  optionsDropdownAC = [{ key: 1, text: "AC1", value: 1 }];

  /**
  * [api]: Contains received data from express server
  * [currentTimeRange]: Contains selected time frame for trend and deck elements
  * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
  * [dataACD, dataECD, dataACT, dataECT]: Holds data for "consumption_electricity_x.csv"; "consumption_air_x.csv"
  * The "x" represents the sensor location
  */
  state = {
    api: {
      dataACD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        maxValue: 0,
        minValue: 0
      },
      dataECD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        maxValue: 0,
        minValue: 0
      },
      dataACT: [],
      dataECT: [],
    },
    currentTimeRange: {
      currentTimeRangeACD: "week",
      currentTimeRangeACT: "week",
      currentTimeRangeECD: "week",
      currentTimeRangeECT: "week"
    },
    currentValueDropdown: {
      currentValueDropdownACD: 1,
      currentValueDropdownACT: 1,
      currentValueDropdownECD: 1,
      currentValueDropdownECT: 1,
    }
  }

  /**
   * 1. Fetch data when component mounts for the first time
   * 2. Triggers automatic updates every "x" milliseconds
   */
  async componentDidMount() {
    // Load options for dropdowns
    const fallbackOptionsDropdownEC = [{ key: 1, text: "EC1", value: 1 }];
    const fallbackOptionsDropdownAC = [{ key: 1, text: "AC1", value: 1 }];
    this.optionsDropdownEC = await getDataForDropdown("electricity", fallbackOptionsDropdownEC);
    this.optionsDropdownAC = await getDataForDropdown("air", fallbackOptionsDropdownAC);

    // Set automatic updates
    this.updateDataOnScreen();
    this.timerID = setInterval(() => this.updateDataOnScreen(), 3600000);
  }

  // If component unmounts, then free memory resources
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async updateDataOnScreen() {
    // Define id's to target all UI elements
    const { currentTimeRange, currentValueDropdown } = this.state;
    const ids = ["ACD", "ACT", "ECD", "ECT"];

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
          dataACD: data[0],
          dataACT: data[1],
          dataECD: data[2],
          dataECT: data[3]
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
     * "data" is "false". Though I can exit the function at 
     * this point, I'll let it continue. Trends and deck 
     * elements handle the event of no-data using fallback data 
     */
    const filteredData = await processDataFromServer(currentValueDropdown, id, timeRange);

    // Update state of all elements
    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      const dataSelector = `data${id}`;
      const currentTimeRange = `currentTimeRange${id}`;
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  /**
   * @param {*} ids Arrays of ids (i.e "ACD", "ACT", "ECD", "ECT")
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
    const { createContextValues, optionsDropdownAC, optionsDropdownEC } = this;

    // Data from API
    const { dataACT, dataACD, dataECT, dataECD, } = this.state.api;

    // Current time range for elements
    const { currentTimeRangeACD, currentTimeRangeECD } = this.state.currentTimeRange;

    // Create context values
    const ids = ["ECT", "ACT", "ECD", "ACD"];
    const contextValue = createContextValues(ids);

    // Deck UI components
    const DeckACD = <Deck data={dataACD} timeRange={currentTimeRangeACD} units="m3/h" />;
    const DeckECD = <Deck data={dataECD} timeRange={currentTimeRangeECD} units="kW" />;

    // Dropdown UI components
    // const DropdownEC = <Dropdown {...propsDropdownEC} />;
    // const DropdownAC = <Dropdown {...propsDropdownAC} />;
    const DropdownEC = <Dropdown options={optionsDropdownEC} />;
    const DropdownAC = <Dropdown options={optionsDropdownAC} />;

    // Line chart UI components
    const LineChartACT = <LineChart id="ACT" data={[{ id: "Airflow", data: dataACT }]} />;
    const LineChartECT = <LineChart id="ECT" data={[{ id: "Electricity", data: dataECT }]} />;

    return (
      <Row className={styles.electricityAir}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsTitleBarECT} graph={LineChartECT} dropdown={DropdownEC} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[1]}>
              <GraphContainer {...propsTitleBarACT} graph={LineChartACT} dropdown={DropdownAC} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer {...propsTitleBarECD} graph={DeckECD} dropdown={DropdownEC} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom} >
            <GraphContext.Provider value={contextValue[3]}>
              <GraphContainer {...propsTitleBarACD} graph={DeckACD} dropdown={DropdownAC} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ElectricityAir;