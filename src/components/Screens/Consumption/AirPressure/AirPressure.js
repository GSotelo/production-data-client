import React, { Component } from "react";
import Deck from "../../../UI/Deck/CustomDeck/CustomDeck_1";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import GraphContext from "../../../Context/GraphContext";
import LineChart from "./utilities/LineChart";
import { Row, Col } from "antd";

import styles from "./AirPressure.module.css";
import processDataFromServer from "./utilities/handlersServer";
import { setCurrentValueDropdown } from "./utilities/miscellaneous";
import { propsTitleBarAPT, propsTitleBarAPD, propsDropdownAP } from "./utilities/props";

class AirPressure extends Component {
  /**
  * [api]: Contains received data from express server
  * [currentTimeRange]: Contains selected time frame for trend and deck elements
  * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
  * [dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT]: Holds data for "sensor_air_pressure_x.csv"
  * The "x" represents the sensor location
  */
  state = {
    api: {
      dataBottomAPD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        maxValue: 0,
        minValue: 0
      },
      dataTopAPD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        maxValue: 0,
        minValue: 0
      },
      dataBottomAPT: [],
      dataTopAPT: []
    },
    currentTimeRange: {
      currentTimeRangeBottomAPD: "week",
      currentTimeRangeBottomAPT: "week",
      currentTimeRangeTopAPD: "week",
      currentTimeRangeTopAPT: "week"
    },
    currentValueDropdown: {
      currentValueDropdownBottomAPD: 1,
      currentValueDropdownBottomAPT: 1,
      currentValueDropdownTopAPD: 1,
      currentValueDropdownTopAPT: 1,
    }
  }

  /**
   * 1. Fetch data when component mounts for the first time
   * 2. Triggers automatic updates every "x" milliseconds
   */
  async componentDidMount() {
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
    const ids = ["BottomAPD", "BottomAPT", "TopAPD", "TopAPT"];

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
          dataBottomAPD: data[0],
          dataBottomAPT: data[1],
          dataTopAPD: data[2],
          dataTopAPT: data[3]
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
    const data = await processDataFromServer(currentValueDropdown, id, timeRange);

    // Update state of all elements
    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      const dataSelector = `data${id}`;
      const currentTimeRange = `currentTimeRange${id}`;
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = data;
      return { nextUpdate };
    });
  }

  /**
   * @param {*} ids Arrays of ids (i.e "BottomAPD", "BottomAPT", "TopAPD", "TopAPT")
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
    // Extract some class methods
    const { createContextValues } = this;

    // Data from API
    const { dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT } = this.state.api;

    // Current time range for elements
    const { currentTimeRangeBottomAPD, currentTimeRangeTopAPD } = this.state.currentTimeRange;

    // Create context values
    const ids = ["TopAPT", "BottomAPT", "TopAPD", "BottomAPD"];
    const contextValue = createContextValues(ids);

    // Deck UI components
    const DeckTopAPD = <Deck data={dataTopAPD} timeRange={currentTimeRangeTopAPD} units="bar" />;
    const DeckBottomAPD = <Deck data={dataBottomAPD} timeRange={currentTimeRangeBottomAPD} units="bar" />;

    // Dropdown UI components
    const DropdownAP = <Dropdown {...propsDropdownAP} />

    // Line chart UI components
    const LineChartBottomAPT = <LineChart id="BottomAPT" data={[{ id: "Air pressure", data: dataBottomAPT }]} />;
    const LineChartTopAPT = <LineChart id="TopAPT" data={[{ id: "Air pressure", data: dataTopAPT }]} />;

    return (
      <Row className={styles.airPressure}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsTitleBarAPT} graph={LineChartTopAPT} dropdown={DropdownAP} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[1]}>
              <GraphContainer {...propsTitleBarAPT} graph={LineChartBottomAPT} dropdown={DropdownAP} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer {...propsTitleBarAPD} graph={DeckTopAPD} dropdown={DropdownAP} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[3]}>
              <GraphContainer {...propsTitleBarAPD} graph={DeckBottomAPD} dropdown={DropdownAP} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default AirPressure;