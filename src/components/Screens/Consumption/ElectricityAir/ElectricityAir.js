import React, { Component } from "react";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import  GraphContext from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./ElectricityAir.module.css";
import { connectServer } from "./utilities/connectServer";
import {
  propsTitleBarACD,
  propsTitleBarACT,
  propsTitleBarECD,
  propsTitleBarECT
} from "./utilities/props";

//TEST MODE
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";

/************************************************************************* */
// TO BE MODIFIED AT THE END...

// Dropdown options: Electricity consumption
const optionsEC = [
  { key: 1, text: "EC1", value: 1 },
  { key: 2, text: "EC2", value: 2 },
  { key: 3, text: "EC3", value: 3 },
  { key: 4, text: "EC4", value: 4 },
  { key: 5, text: "EC5", value: 5 }
];
//Dropdown: Electricity consumption
const dropdownEC = <Dropdown options={optionsEC} />
//Dropdown: Electricity consumption card
const dropdownECC = <Dropdown options={optionsEC} />

// Dropdown options: Air consumption
const optionsAC = [
  { key: 1, text: "AC1", value: 1 },
  { key: 2, text: "AC2", value: 2 },
  { key: 3, text: "AC3", value: 3 },
  { key: 4, text: "AC4", value: 4 },
  { key: 5, text: "AC5", value: 5 }
];
//Dropdown: Air consumption
const dropdownAC = <Dropdown options={optionsAC} />
//Dropdown: Air consumption card
const dropdownACC = <Dropdown options={optionsAC} />

/************************************************************************* */

// Horizontal cards: Electricity consumption
const dataECC = [
  {
    label: "▲ Previous day:",
    previousValue: "390 kW",
    type: 1,
    value: 437,
    units: "kg"
  },
  {
    type: 2,
    value: 440,
    units: "kW"
  },
  {
    type: 2,
    value: 410,
    units: "kW"
  }
];
const cardsEC = dataECC.map(el => <CustomCard {...el} />);
const deckEC = <HorizontalCards cards={cardsEC} />

// Horizontal cards: Electricity consumption
const dataACC = [
  {
    label: "▬ Previous day:",
    previousValue: "129 m3/h",
    type: 1,
    value: 129,
    units: "m3/h"
  },
  {
    type: 2,
    value: 170,
    units: "m3/h"
  },
  {
    type: 2,
    value: 110,
    units: "m3/h"
  }
];
const cardsAC = dataACC.map(el => <CustomCard {...el} />);
const deckAC = <HorizontalCards cards={cardsAC} />

class ElectricityAir extends Component {

  /**
   * [api]: Contains received data from express server
   * [dataACT, dataECT]: Holds "consumption_electricity_x.csv", "consumption_air_x.csv" data.
   * The "x" represents the sensor location
   */
  state = {
    api: {
      dataACD: [],
      dataACT: [],
      dataECD: [],
      dataECT: []
    },
    currentTimeRange: {
      timeRangeACD: "week",
      timeRangeACT: "week",
      timeRangeECD: "week",
      timeRangeECT: "week"
    },
    currentValueDropdown: {
      dropdownACD: 1,
      dropdownACT: 1,
      dropdownECD: 1,
      dropdownECT: 1,
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
    const { dropdownACD, dropdownACT, dropdownECD, dropdownECT } = this.state.currentValueDropdown;
    const { timeRangeACD, timeRangeACT, timeRangeECD, timeRangeECT } = this.state.currentTimeRange;

    const dataACD = await connectServer(dropdownACD, "ACD", timeRangeACD);
    const dataACT = await connectServer(dropdownACT, "ACT", timeRangeACT);
    const dataECD = await connectServer(dropdownECD, "ECD", timeRangeECD);
    const dataECT = await connectServer(dropdownECT, "ECT", timeRangeECT);

    this.setState({ api: { dataACD, dataACT, dataECD, dataECT } });
  }

  /**
  * Each sensor stores its data in one specific file, which
  * is targeted by the dropdown (current selected option)
  * 
  */
  updateDropdownState = (e, { value }, id) => this.setState(prevState => {
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
    const { dropdownACD, dropdownACT, dropdownECD, dropdownECT } = this.state.currentValueDropdown;

    /**
     * When users click any of the control buttons (day, week, month), the current value of the dropdown,
     * helps to target the correct recipe file (i.e. "consumption_powder_type_2.csv" ). Here we need
     * to be careful of using the correct dropdown value as there are two on the screen. Do not swap the  values
     * (top instead of bottom value and viceversa) 
     */
    if (id === "ACD") currentValueDropdown = dropdownACD;
    if (id === "ACT") currentValueDropdown = dropdownACT;
    if (id === "ECD") currentValueDropdown = dropdownECD;
    if (id === "ECT") currentValueDropdown = dropdownECT;

    // Contains response data from API. The data is formatted based on nivo library
    const filteredData = await connectServer(currentValueDropdown, id, timeRange);

    this.setState(prevState => {
      const dataSelector = `data${id}`; // dataACD, dataACT, dataECD, dataECT
      const currentTimeRange = `timeRange${id}`; // timeRangeACD, timeRangeACT, timeRangeECD, timeRangeECT

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  render() {
    // Dropdown: Current selected options
    const { dropdownACD, dropdownACT, dropdownECD, dropdownECT } = this.state.currentValueDropdown;

    // Initialize context values for graph containers
    const contextValueACD = {
      id: "ACD",
      currentValueDropdown: dropdownACD,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueACT = {
      id: "ACT",
      currentValueDropdown: dropdownACT,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueECD = {
      id: "ECD",
      currentValueDropdown: dropdownECD,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    const contextValueECT = {
      id: "ECT",
      currentValueDropdown: dropdownECT,
      getDataFromServer: this.getDataFromServer,
      updateDropdownState: this.updateDropdownState
    };

    // Data from express server
    const { dataACT, dataECT } = this.state.api;

    /**
     * When a LineChart component is created, the "id" must match the ones required
     * by the "LineChart" component. Refer to the component definition for more details
     */
    const graphACT = <LineChart id="ACT" data={[{ id: "Airflow", data: dataACT }]} />
    const graphECT = <LineChart id="ECT" data={[{ id: "Electricity", data: dataECT }]} />

    return (
      <Row className={styles.electricityAir}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueECT}>
              <GraphContainer {...propsTitleBarECT} graph={graphECT} dropdown={dropdownEC} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueACT}>
              <GraphContainer {...propsTitleBarACT} graph={graphACT} dropdown={dropdownAC} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueECD}>
              <GraphContainer {...propsTitleBarECD} graph={deckEC} dropdown={dropdownECC} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom} >
            <GraphContext.Provider value={contextValueACD}>
              <GraphContainer {...propsTitleBarACD} graph={deckAC} dropdown={dropdownACC} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default ElectricityAir;