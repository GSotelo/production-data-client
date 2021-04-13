import React, { Component } from "react";
import Card from "../../../UI/Card/CustomCard/CustomCard";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";
import LineChart from "./utilities/LineChart";
import { GraphContext } from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./AirPressure.module.css";
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
  * [dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT]: Holds "sensor_air_pressure_x.csv"
  * The "x" represents the sensor location
  */
  state = {
    api: {
      dataBottomAPD: {
        average: {
          meanToday: 0,
          meanPreviousDay: 0
        },
        highPeak: 0,
        lowPeak: 0
      },
      dataTopAPD: {
        average: {
          meanToday: 0,
          meanPreviousDay: 0
        },
        highPeak: 0,
        lowPeak: 0
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
    //this.updateDataOnScreen();
    //this.timerID = setInterval(() => this.updateDataOnScreen(), 5000);
  }

  componentWillUnmount() {
    //clearInterval(this.timerID);
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
    let averageCard;
    let highPeakCard;
    let lowPeakCard;

    // Current option selected in dropdown
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
    const filteredData = await connectServer(currentValueDropdown, id, timeRange);

    // Prepare data for deck (Average, high peak, low peak)
    if (id === "BottomAPD" || id === "TopAPD") {
      averageCard = processDataDeck.getAverage(filteredData, timeRange);
      highPeakCard = processDataDeck.getHighPeak(filteredData);
      lowPeakCard = processDataDeck.getLowPeak(filteredData);

      // Event: Datepicker - clear field
      if(!averageCard || !highPeakCard || !lowPeakCard ){
        return;
      }
    }

    // Update state for all elements
    this.setState(prevState => {
      const dataSelector = `data${id}`; // dataBottomAPD, dataBottomAPT, dataTopAPD, dataTopAPT
      const currentTimeRange = `currentTimeRange${id}`; // timeRangeBottomAPD, timeRangeBottomAPT, timeRangeTopAPD, timeRangeTopAPT

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;

      if (dataSelector === "dataBottomAPT" || dataSelector === "dataTopAPT") {
        nextUpdate.api[dataSelector] = filteredData;
        return { nextUpdate };
      }

      if (dataSelector === "dataBottomAPD" || dataSelector === "dataTopAPD") {
        nextUpdate.api[dataSelector].average = averageCard;
        nextUpdate.api[dataSelector].highPeak = highPeakCard;
        nextUpdate.api[dataSelector].lowPeak = lowPeakCard;
        return { nextUpdate };
      }
    });
  }

  render() {
    // Data from API
    const {
      dataBottomAPD,
      dataBottomAPT,
      dataTopAPD,
      dataTopAPT
    } = this.state.api;

    // Current time range
    const {
      currentTimeRangeBottomAPD,
      currentTimeRangeTopAPD
    } = this.state.currentTimeRange;

    // Data for bottom deck - air pressure (APD)
    const averageTodayDataBottomAPD = dataBottomAPD.average.meanToday;
    const averagePrevDataBottomAPD = dataBottomAPD.average.meanPreviousDay;
    const valueFooterBottomAPD = processDataDeck.setFooterValue(currentTimeRangeBottomAPD,averagePrevDataBottomAPD, "bar");
    const labelFooterBottomAPD = processDataDeck.setFooterLabel(currentTimeRangeBottomAPD, averageTodayDataBottomAPD, averagePrevDataBottomAPD);
     
    // Data for top deck - air pressure (APD)
    const averageTodayDataTopAPD = dataTopAPD.average.meanToday;
    const averagePrevDataTopAPD = dataTopAPD.average.meanPreviousDay;
    const valueFooterTopAPD = processDataDeck.setFooterValue(currentTimeRangeTopAPD, averagePrevDataTopAPD, "bar");
    const labelTopAPD = processDataDeck.setFooterLabel(currentTimeRangeTopAPD, averageTodayDataTopAPD, averagePrevDataTopAPD);

    // Horizontal cards: Air pressure 1
    const configTopAPD = [
      {
        label: labelTopAPD,
        previousValue: valueFooterTopAPD,
        type: 1,
        value: averageTodayDataTopAPD,
        units: "bar"
      },
      {
        type: 2,
        value: this.state.api.dataTopAPD.highPeak,
        units: "bar"
      },
      {
        type: 3,
        value: this.state.api.dataTopAPD.lowPeak,
        units: "bar"
      }
    ];
    const arrCardTopAPD = configTopAPD.map(el => <Card {...el} />);
    const graphTopAPD = <HorizontalCards cards={arrCardTopAPD} />

    // Horizontal cards: Air pressure 2
    const configBottomAPD = [
      {
        label: labelFooterBottomAPD,
        previousValue: valueFooterBottomAPD,
        type: 1,
        value: averageTodayDataBottomAPD,
        units: "bar"
      },
      {
        type: 2,
        value: this.state.api.dataBottomAPD.highPeak,
        units: "bar"
      },
      {
        type: 3,
        value: this.state.api.dataBottomAPD.lowPeak,
        units: "bar"
      }
    ];
    const arrCardBottomAPD = configBottomAPD.map(el => <Card {...el} />);
    const graphBottomAPD = <HorizontalCards cards={arrCardBottomAPD} />

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