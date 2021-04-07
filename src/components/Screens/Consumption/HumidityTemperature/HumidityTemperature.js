import React, { Component } from 'react';
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import { GraphContext } from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./HumidityTemperature.module.css";
import { connectServer } from "./utilities/connectServer";
import { propsTitleBarHSD, propsTitleBarHST, propsTitleBarTSD, propsTitleBarTST } from "./utilities/props";

// TEST
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";

// Dropdown options: Humidity sensor
const optionsHS = [
  { key: 1, text: "HS1", value: 1 },
  { key: 2, text: "HS2", value: 2 },
  { key: 3, text: "HS3", value: 3 },
  { key: 4, text: "HS4", value: 4 },
  { key: 5, text: "HS5", value: 5 }
];
//Dropdown: Humidity
const dropdownHS = <Dropdown options={optionsHS} />
//Dropdown: Electricity consumption card
const dropdownHSC = <Dropdown options={optionsHS} />

// Dropdown options: Temperature sensor
const optionsTS = [
  { key: 1, text: "TS1", value: 1 },
  { key: 2, text: "TS2", value: 2 },
  { key: 3, text: "TS3", value: 3 },
  { key: 4, text: "TS4", value: 4 },
  { key: 5, text: "TS5", value: 5 }
];
//Dropdown: Air consumption
const dropdownTS = <Dropdown options={optionsTS} />
//Dropdown: Air consumption card
const dropdownTSC = <Dropdown options={optionsTS} />

// Horizontal cards: Temperature sensor
const dataTSC = [
  {
    label: "▼ Previous month:",
    previousValue: "37°C",
    type: 1,
    value: 33,
    units: "°C"
  },
  {
    type: 2,
    value: 40,
    units: "°C"
  },
  {
    type: 3,
    value: 17,
    units: "°C"
  }
];
const cardsTS = dataTSC.map(el => <CustomCard {...el} />);
const deckTS = <HorizontalCards cards={cardsTS} />

// Horizontal cards: Humidity sensor
const dataHSC = [
  {
    label: "▲ Previous month:",
    previousValue: "46%",
    type: 1,
    value: 47,
    units: "%"
  },
  {
    type: 2,
    value: 73,
    units: "%"
  },
  {
    type: 3,
    value: 31,
    units: "%"
  }
];
const cardsHS = dataHSC.map(el => <CustomCard {...el} />);
const deckHS = <HorizontalCards cards={cardsHS} />

class HumidityTemperature extends Component {
  /**
  * [api]: Contains received data from express server
  * [dataHSD, dataHST, dataTSD, dataTST]: Holds "sensor_humidity_x.csv", "sensor_temperature_x.csv" data.
  * The "x" represents the sensor location
  */
  state = {
    api: {
      dataHSD: [],
      dataHST: [],
      dataTSD: [],
      dataTST: []
    },
    currentTimeRange: {
      currentTimeRangeHSD: "week",
      currentTimeRangeHST: "week",
      currentTimeRangeTST: "week",
      currentTimeRangeTSD: "week"
    },
    currentValueDropdown: {
      currentValueDropdownHSD: 1,
      currentValueDropdownHST: 1,
      currentValueDropdownTSD: 1,
      currentValueDropdownTST: 1,
    }
  }

  /**
   * 1. Fetch data when component mounts for the first time
   * 2. Triggers automatic updates every "x" milliseconds
   */
   async componentDidMount() {
    this.updateDataOnScreen();
    this.timerID = setInterval(() => this.updateDataOnScreen(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async updateDataOnScreen() {
    const {
      currentValueDropdownHSD,
      currentValueDropdownHST,
      currentValueDropdownTSD,
      currentValueDropdownTST
    } = this.state.currentValueDropdown;

    const {
      currentTimeRangeHSD,
      currentTimeRangeHST,
      currentTimeRangeTSD,
      currentTimeRangeTST
    } = this.state.currentTimeRange;

    const dataHSD = await connectServer(currentValueDropdownHSD, "HSD", currentTimeRangeHSD);
    const dataHST = await connectServer(currentValueDropdownHST, "HST", currentTimeRangeHST);
    const dataTSD = await connectServer(currentValueDropdownTSD, "TSD", currentTimeRangeTSD);
    const dataTST = await connectServer(currentValueDropdownTST, "TST", currentTimeRangeTST);

    this.setState({ api: { dataHSD, dataHST, dataTSD, dataTST } });
  }

  /**
  * Each sensor stores its data in one specific file, which
  * is targeted by the dropdown (current selected option)
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
    let currentValueDropdown;

    const {
      currentValueDropdownHSD,
      currentValueDropdownHST,
      currentValueDropdownTSD,
      currentValueDropdownTST
    } = this.state.currentValueDropdown;

    /**
     * When users click any of the control buttons (day, week, month), the current value of the dropdown,
     * helps to target the correct recipe file (i.e. "temperature_sensor_2.csv" )
     */
    if (id === "HSD") currentValueDropdown = currentValueDropdownHSD;
    if (id === "HST") currentValueDropdown = currentValueDropdownHST;
    if (id === "TSD") currentValueDropdown = currentValueDropdownTSD;
    if (id === "TST") currentValueDropdown = currentValueDropdownTST;

    // Contains response data from API. The data is formatted based on nivo library
    const filteredData = await connectServer(currentValueDropdown, id, timeRange);

    this.setState(prevState => {
      const dataSelector = `data${id}`; // dataHSD, dataHST, dataTSD, dataTST
      const currentTimeRange = `currentTimeRange${id}`; // timeRangeHSD, timeRangeHST, timeRangeTSD, timeRangeTST

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  render() {
    // Dropdown: Current selected options
    const {
      currentValueDropdownHSD,
      currentValueDropdownHST,
      currentValueDropdownTSD,
      currentValueDropdownTST
    } = this.state.currentValueDropdown;

    // Initialize context values for graph containers
    const contextValueHSD = {
      id: "HSD",
      currentValueDropdown: currentValueDropdownHSD,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueHST = {
      id: "HST",
      currentValueDropdown: currentValueDropdownHST,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueTSD = {
      id: "TSD",
      currentValueDropdown: currentValueDropdownTSD,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueTST = {
      id: "TST",
      currentValueDropdown: currentValueDropdownTST,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    // Data from express server
    const { dataHST, dataTST } = this.state.api;

    /**
     * When a LineChart component is created, the "id" must match the ones required
     * by the "LineChart" component. Refer to the component definition for more details
     */
    const graphHST = <LineChart id="HST" data={[{ id: "Humidity", data: dataHST }]} />
    const graphTST = <LineChart id="TST" data={[{ id: "Temperature", data: dataTST }]} />

    return (
      <Row className={styles.humidityTemperature}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueTST}>
              <GraphContainer {...propsTitleBarTST} graph={graphTST} dropdown={dropdownTS} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueHST}>
              <GraphContainer {...propsTitleBarHST} graph={graphHST} dropdown={dropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueTSD}>
              <GraphContainer {...propsTitleBarTSD} dropdown={dropdownTSC} graph={deckTS} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueHSD}>
              <GraphContainer {...propsTitleBarHSD} dropdown={dropdownHSC} graph={deckHS} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default HumidityTemperature;