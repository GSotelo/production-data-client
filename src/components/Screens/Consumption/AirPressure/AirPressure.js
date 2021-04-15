import React, { Component } from "react";
import Deck from "../../../UI/Deck/CustomDeck/CustomDeck";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import { GraphContext } from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./AirPressure.module.css";
import { setCurrentValueDropdown } from "./utilities/miscellaneous";
import processDataDeck from "../../../../utils/processDataDeck";
import { connectServer } from "./utilities/connectServer";
import { propsTitleBarAPT, propsTitleBarAPD } from "./utilities/props";

// Dropdown options: Air pressure
const optionsAP = [
  { key: 1, text: "AP1", value: 1 },
  { key: 2, text: "AP2", value: 2 },
  { key: 3, text: "AP3", value: 3 },
  { key: 4, text: "AP4", value: 4 },
  { key: 5, text: "AP5", value: 5 }
];

//Dropdown: Air pressure (1)
const dropdownAP1 = <Dropdown options={optionsAP} />
//Dropdown: Air pressure (2)
const dropdownAP2 = <Dropdown options={optionsAP} />
//Dropdown: Air pressure (1) card
const dropdownAPC1 = <Dropdown options={optionsAP} />
//Dropdown: Air pressure (2) card
const dropdownAPC2 = <Dropdown options={optionsAP} />

class AirPressure extends Component {
  /**
  * [api]: Contains received data from express server
  * [currentTimeRange]: Contains selected time frame for trend and deck elements
  * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
  * [error]: If API request fails, error is "true"
  * [dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT]: Holds "sensor_air_pressure_x.csv"
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
    },
    error: false
  }

  /**
   * 1. Fetch data when component mounts for the first time
   * 2. Triggers automatic updates every "x" milliseconds
   */
  async componentDidMount() {
    this.updateDataOnScreen();
    this.timerID = setInterval(() => this.updateDataOnScreen(), 5000);
  }

  // If component unmounts, then free memory resources
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * [updateDataOnScreen]: Trigger screen updates every "x" millisenconds
   */
  async updateDataOnScreen() {
    const {
      currentValueDropdownBottomAPD,
      currentValueDropdownBottomAPT,
      currentValueDropdownTopAPD,
      currentValueDropdownTopAPT
    } = this.state.currentValueDropdown;

    const {
      currentTimeRangeBottomAPD,
      currentTimeRangeBottomAPT,
      currentTimeRangeTopAPD,
      currentTimeRangeTopAPT,
    } = this.state.currentTimeRange;

    //filteredData = await connectServer(currentValueDropdown, id, timeRange);


    //const dataBottomAPD = await connectServer(currentValueDropdownBottomAPD, "BottomAPD", currentTimeRangeBottomAPD);
    //const dataBottomAPT = await connectServer(currentValueDropdownBottomAPT, "BottomAPT", currentTimeRangeBottomAPT);
    //const dataTopAPD = await connectServer(currentValueDropdownTopAPD, "TopAPD", currentTimeRangeTopAPD);
    //const dataTopAPT = await connectServer(currentValueDropdownTopAPT, "TopAPT", currentTimeRangeTopAPT);

    //const dataForDeck = processDataDeck.run(filteredData, timeRange);


    // this.setState({ api: { dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT } });
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
     * based on nivo library. If promise is rejected, the error 
     * flag in the state object is activated. If an error comes up, 
     * then "filteredData" is undefined. Though I can exit the 
     * function at this point, I'll let it continue. Trends and 
     * deck elements handle the event of no-data using fallback data 
     */
    let filteredData;
    try {
      filteredData = await connectServer(currentValueDropdown, id, timeRange);
    } catch (error) {
      console.error("[getDataFromServer]: Request to server API failed");
      this.setState({ error: true });
    }

    // Data for either trend or deck elements
    let data;
    if ((id === "BottomAPD") || (id === "TopAPD")) {
      data = processDataDeck.run(filteredData, timeRange);
      console.log("DATA ;", data);
    }
    if ((id === "BottomAPT") || (id === "TopAPT")) {
      data = filteredData;
    }

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

  render() {
    // Error status of API request
    const { error } = this.state.api;

    // Dropdowns: Current selected option
    const {
      currentValueDropdownBottomAPD,
      currentValueDropdownBottomAPT,
      currentValueDropdownTopAPD,
      currentValueDropdownTopAPT
    } = this.state.currentValueDropdown;

    // Data from API
    const { dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT } = this.state.api;

    // Deck components
    const { currentTimeRangeBottomAPD, currentTimeRangeTopAPD } = this.state.currentTimeRange;
    const graphTopAPD = <Deck data={dataTopAPD} timeRange={currentTimeRangeTopAPD} units="bar" />
    const graphBottomAPD = <Deck data={dataBottomAPD} timeRange={currentTimeRangeBottomAPD} units="bar" />

    // Initialize context values for graph containers
    const contextValueBottomAPD = {
      id: "BottomAPD",
      currentValueDropdown: currentValueDropdownBottomAPD,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueBottomAPT = {
      id: "BottomAPT",
      currentValueDropdown: currentValueDropdownBottomAPT,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueTopAPD = {
      id: "TopAPD",
      currentValueDropdown: currentValueDropdownTopAPD,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueTopAPT = {
      id: "TopAPT",
      currentValueDropdown: currentValueDropdownTopAPT,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    /**
     * When a LineChart component is created, the "id" must match the ones required
     * by the "LineChart" component. Refer to the component definition for more details
     */
    const graphBottomAPT = <LineChart id="BottomAPT" data={[{ id: "Air pressure", data: dataBottomAPT }]} />
    const graphTopAPT = <LineChart id="TopAPT" data={[{ id: "Air pressure", data: dataTopAPT }]} />

    return (
      <Row className={styles.airPressure}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueTopAPT}>
              <GraphContainer {...propsTitleBarAPT} graph={graphTopAPT} dropdown={dropdownAP1} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueBottomAPT}>
              <GraphContainer {...propsTitleBarAPT} graph={graphBottomAPT} dropdown={dropdownAP2} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueTopAPD}>
              <GraphContainer {...propsTitleBarAPD} dropdown={dropdownAPC1} graph={graphTopAPD} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueBottomAPD}>
              <GraphContainer {...propsTitleBarAPD} dropdown={dropdownAPC2} graph={graphBottomAPD} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default AirPressure;