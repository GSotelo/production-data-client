import React, { Component } from 'react';
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import GraphContext from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./HumidityTemperature.module.css";
import connectServer from "./utilities/connectServer";

import { setCurrentValueDropdown } from "./utilities/miscellaneous";

import {
  propsDropdownHS,
  propsDropdownTS,
  propsTitleBarHSD,
  propsTitleBarHST,
  propsTitleBarTSD,
  propsTitleBarTST
} from "./utilities/props";

// TEST
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";


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
  * [currentTimeRange]: Contains selected time frame for trend and deck elements
  * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
  * [dataHSD, dataHST, dataTSD, dataTST]: Holds "sensor_humidity_x.csv", "sensor_temperature_x.csv" 
  * The "x" represents the sensor location
  */
  state = {
    api: {
      dataHSD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        maxValue: 0,
        minValue: 0
      },
      dataTSD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        maxValue: 0,
        minValue: 0
      },
      dataHST: [],
      dataTST: [],
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
    //this.updateDataOnScreen();
    //this.timerID = setInterval(() => this.updateDataOnScreen(), 60000);
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



  /**
   * [generateContextValues]: Create context objects for graphs
   * [id]: Target trend and deck elements
   * [currentValueDropdown]: Value of dropdown element
   */
  createContextValues = (id, currentValueDropdown) => {
    const { getDataFromServer, updateDropdownState } = this;
    return {
      id,
      currentValueDropdown,
      getDataFromServer,
      updateDropdownState
    };
  }

  render() {

    // Extract some class methods
    const { createContextValues } = this;

    // Data from express server
    const { dataHST, dataTST } = this.state.api;




    // Dropdowns: Current selected option
    const {
      currentValueDropdownHSD,
      currentValueDropdownHST,
      currentValueDropdownTSD,
      currentValueDropdownTST
    } = this.state.currentValueDropdown;

    // Initialize context values for graph containers
    const contextValueHSD = createContextValues("HSD", currentValueDropdownHSD);
    const contextValueHST = createContextValues("HST", currentValueDropdownHST);
    const contextValueTSD = createContextValues("TSD", currentValueDropdownTSD);
    const contextValueTST = createContextValues("TST", currentValueDropdownTST);

    // Dropdown UI components
    const DropdownHS = <Dropdown {...propsDropdownHS} />;
    const DropdownTS = <Dropdown {...propsDropdownTS} />;

    // Line chart UI components
    const LineChartHST = <LineChart id="HST" data={[{ id: "Humidity", data: dataHST }]} />;
    const LineChartTST = <LineChart id="TST" data={[{ id: "Temperature", data: dataTST }]} />;

    return (
      <Row className={styles.humidityTemperature}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueTST}>
              <GraphContainer {...propsTitleBarTST} graph={LineChartTST} dropdown={DropdownTS} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueHST}>
              <GraphContainer {...propsTitleBarHST} graph={LineChartHST} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueTSD}>
              <GraphContainer {...propsTitleBarTSD} graph={deckTS} dropdown={DropdownTS} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueHSD}>
              <GraphContainer {...propsTitleBarHSD} graph={deckHS} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default HumidityTemperature;