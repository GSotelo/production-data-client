import React, { Component } from 'react';
//import Deck from "./utilities/CustomDeck";
import Deck from "../../../UI/Deck/CustomDeck/CustomDeck_2/CustomDeck_2";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import GraphContext from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./FreshPowder.module.css";
import { connectServer } from "./utilities/connectServer";
import {
  propsDropdownBB,
  propsTitleBarBBT,
  propsTitleBarBBD,
  propsTitleBarSHDT,
  propsTitleBarSHDD,
  propsTitleBarTFPT,
  propsTitleBarTFPD,
} from "./utilities/props";

/**
 * Data for deck: Total fresh powder
 */
const dataDeckTFP = [
  {
    icon: "total",
    id: "tfp_c1",
    value: 1798,
    units: "kg",
    label: "▲ Previous week:",
    previousValue: "1631 kg"
  },
  {
    icon: "average",
    id: "tfp_c2",
    value: 11,
    units: "kg",
    label: "▲ Previous week:",
    previousValue: "10 kg/h"
  }
];
const graphTFPD = <Deck orientation="horizontal" deck={dataDeckTFP} />;

/**
 * Data for deck: Spectrum HD
 */
const dataDeckSHD = [
  {
    icon: "total",
    id: "shd_c1",
    value: 1000,
    units: "kg",
    label: "▬ Previous week:",
    previousValue: "1000 kg"
  },
  {
    icon: "average",
    id: "shd_c2",
    value: 6,
    units: "kg/h",
    label: "▼ Previous week:",
    previousValue: "7 kg/h"
  }
];
const graphSHDD = <Deck orientation="vertical" deck={dataDeckSHD} />;

/**
 * Data for deck: Big bag
 */
const dataDeckBB = [
  {
    icon: "total",
    id: "bb_c1",
    value: 798,
    units: "kg",
    label: "▲ Previous week:",
    previousValue: "631 kg"
  },
  {
    icon: "average",
    id: "bb_c2",
    value: 5,
    units: "kg/h",
    label: "▬ Previous week:",
    previousValue: "5 kg/h"
  }
];
const graphBBD = <Deck orientation="vertical" deck={dataDeckBB} />;


class FreshPowder extends Component {
  /**
 * [api]: Contains received data from express server
 * [currentTimeRange]: Contains selected time frame for trend and deck elements
 * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
 * [dataBBT, dataSHDT, dataTFPD, dataTFPT]: Holds data for "powder_total_fresh.csv", 
 * "powder_spectrum.csv", "powder_big_bag_x.csv"  
 * The "x" represents the sensor location
 */
  state = {
    api: {
      dataTFPD: [],
      dataBBT: [],
      dataSHDT: [],
      dataTFPT: []
    },
    currentTimeRange: {
      currentTimeRangeTFPD: "week",
      currentTimeRangeBBT: "week",
      currentTimeRangeSHDT: "week",
      currentTimeRangeTFPT: "week"
    },
    currentValueDropdown: {
      currentValueDropdownBBT: 1
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

  async updateDataOnScreen() {
    // const { currentTimeRangeBBT, currentTimeRangeSHDT, currentTimeRangeTFPD, currentTimeRangeTFPT } = this.state.currentTimeRange;
    // const dataBBT = await connectServer("BBT", currentTimeRangeBBT);
    // const dataSHDT = await connectServer("SHDT", currentTimeRangeSHDT);
    // const dataTFPT = await connectServer("TFPT", currentTimeRangeTFPT);
    // const dataTFPD = await connectServer("TFPD", currentTimeRangeTFPD);

    // this.setState({ api: { dataBBT, dataSHDT, dataTFPD, dataTFPT } });
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
    /**
     * Contains response data from API. The data is formatted based on nivo library
     */
    const filteredData = await connectServer(id, timeRange);

    this.setState(prevState => {
      const dataSelector = `data${id}`; // dataTFPT, dataSHDT, etc...
      const currentTimeRange = `timeRange${id}`; // currentTimeRangeTFPT, currentTimeRangeSHDT, etc...

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  /**
  * @param {*} ids Arrays of ids (i.e "TFPT", "TFPD", "SHDT", "BBT")
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

    // Data from express server
    const { dataBBT, dataSHDT, dataTFPT } = this.state.api;

    // Create context values
    const ids = ["TFPT", "TFPD", "SHDT", "BBT"];
    const contextValue = createContextValues(ids);




    // Dropdown UI components
    const DropdownBB = <Dropdown {...propsDropdownBB} />;

    // Line chart UI components
    const LineChartBBT = <LineChart id="BBT" data={[{ id: "Bigbag powder", data: dataBBT }]} />
    const LineChartSHDT = <LineChart id="SHDT" data={[{ id: "SHD powder", data: dataSHDT }]} />
    const LineChartTFPT = <LineChart id="TFPT" data={[{ id: "Total powder", data: dataTFPT }]} />

    return (
      <div className={styles.freshPowder}>
        <Row className={styles.top}>
          <Col className={styles.trendBox}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsTitleBarTFPT} graph={LineChartTFPT} />
            </GraphContext.Provider>
          </Col>

          <GraphContext.Provider value={contextValue[1]}>
            <Col className={styles.deckBox}>
              <GraphContainer {...propsTitleBarTFPD} graph={graphTFPD} />
            </Col>
          </GraphContext.Provider>
        </Row>

        <Row className={styles.bottom}>
          <Col className={styles.trendBox}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer {...propsTitleBarSHDT} graph={LineChartSHDT} />
            </GraphContext.Provider>
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer {...propsTitleBarSHDD} graph={graphSHDD} />
          </Col>

          <Col className={[styles.trendBox, styles.prx].join(" ")}>
            <GraphContext.Provider value={contextValue[3]}>
              <GraphContainer {...propsTitleBarBBT} graph={LineChartBBT} dropdown={DropdownBB} />
            </GraphContext.Provider>
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer {...propsTitleBarBBD} graph={graphBBD} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FreshPowder;