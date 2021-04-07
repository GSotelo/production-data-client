import React, { Component } from "react";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import { GraphContext } from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./AirPressure.module.css";
import { connectServer } from "./utilities/connectServer";
import { propsTitleBarAPT, propsTitleBarAPD } from "./utilities/props";

// TEST
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";

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

// Horizontal cards: Air pressure 1
const dataAP1C = [
  {
    label: "▲ Previous month:",
    previousValue: "6.2 bar",
    type: 1,
    value: 6.3,
    units: "bar"
  },
  {
    type: 2,
    value: 7,
    units: "bar"
  },
  {
    type: 3,
    value: 5,
    units: "bar"
  }
];
const cardsAP1 = dataAP1C.map(el => <CustomCard {...el} />);
const deckAP1 = <HorizontalCards cards={cardsAP1} />

// Horizontal cards: Air pressure 2
const dataAP2C = [
  {
    label: "▲ Previous day:",
    previousValue: "6.2 bar",
    type: 1,
    value: 6.3,
    units: "bar"
  },
  {
    type: 2,
    value: 5.7,
    units: "bar"
  },
  {
    type: 3,
    value: 5.4,
    units: "bar"
  }
];
const cardsAP2 = dataAP2C.map(el => <CustomCard {...el} />);
const deckAP2 = <HorizontalCards cards={cardsAP2} />

class AirPressure extends Component {
  /**
  * [api]: Contains received data from express server
  * [dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT]: Holds "sensor_air_pressure_x.csv"
  * The "x" represents the sensor location
  */
  state = {
    api: {
      dataBottomAPD: [],
      dataBottomAPT: [],
      dataTopAPD: [],
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
    this.timerID = setInterval(() => this.updateDataOnScreen(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

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

    const dataBottomAPD = await connectServer(currentValueDropdownBottomAPD, currentTimeRangeBottomAPD);
    const dataBottomAPT = await connectServer(currentValueDropdownBottomAPT, currentTimeRangeBottomAPT);
    const dataTopAPD = await connectServer(currentValueDropdownTopAPD, currentTimeRangeTopAPD);
    const dataTopAPT = await connectServer(currentValueDropdownTopAPT, currentTimeRangeTopAPT);

    this.setState({ api: { dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT } });
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
      currentValueDropdownBottomAPD,
      currentValueDropdownBottomAPT,
      currentValueDropdownTopAPD,
      currentValueDropdownTopAPT
    } = this.state.currentValueDropdown;

    /**
     * When users click any of the control buttons (day, week, month), the current value of the dropdown,
     * helps to target the correct recipe file (i.e. "sensor_air_pressure_2.csv" )
     */
    if (id === "BottomAPD") currentValueDropdown = currentValueDropdownBottomAPD;
    if (id === "BottomAPT") currentValueDropdown = currentValueDropdownBottomAPT;
    if (id === "TopAPD") currentValueDropdown = currentValueDropdownTopAPD;
    if (id === "TopAPT") currentValueDropdown = currentValueDropdownTopAPT;

    // Contains response data from API. The data is formatted based on nivo library
    const filteredData = await connectServer(currentValueDropdown, timeRange);

    this.setState(prevState => {
      const dataSelector = `data${id}`; // dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT
      const currentTimeRange = `currentTimeRange${id}`; // timeRangeBottomAPD, timeRangeBottomAPT, timeRangeTopAPD, timeRangeTopAPT

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  render() {
    // Dropdown: Current selected options
    const {
      currentValueDropdownBottomAPD,
      currentValueDropdownBottomAPT,
      currentValueDropdownTopAPD,
      currentValueDropdownTopAPT
    } = this.state.currentValueDropdown;

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

    // Data from express server
    const { dataBottomAPT, dataTopAPT } = this.state.api;

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
              <GraphContainer {...propsTitleBarAPD} dropdown={dropdownAPC1} graph={deckAP1} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueBottomAPD}>
              <GraphContainer {...propsTitleBarAPD} dropdown={dropdownAPC2} graph={deckAP2} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default AirPressure;