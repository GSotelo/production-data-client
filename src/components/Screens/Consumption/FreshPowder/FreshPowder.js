import React, { Component } from 'react';
import Deck from "./utilities/CustomDeck";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import  GraphContext  from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./FreshPowder.module.css";
import { connectServer } from "./utilities/connectServer";
import {
  propsTitleBarBBT,
  propsTitleBarBBD,
  propsTitleBarSHDT,
  propsTitleBarSHDD,
  propsTitleBarTFPT,
  propsTitleBarTFPD,
} from "./utilities/propsTitleBar";

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
   * Initialize context values for graph containers
   */
  constructor(props) {
    super(props);
    this.contextValueBBT = { id: "BBT", getDataFromServer: this.getDataFromServer };
    this.contextValueSHDT = { id: "SHDT", getDataFromServer: this.getDataFromServer };
    this.contextValueTFPT = { id: "TFPT", getDataFromServer: this.getDataFromServer };
    this.contextValueTFPD = { id: "TFPD", getDataFromServer: this.getDataFromServer };
  }

  /**
   * [api]: Contains received data from express server
   * [dataTFPT]: Holds "powder_total_fresh.csv" data for trend element
   */
  state = {
    api: {
      dataBBT: [],
      dataSHDT: [],
      dataTFPD: [],
      dataTFPT: []
    },
    currentTimeRange: {
      timeRangeBBT: "week",
      timeRangeSHDT: "week",
      timeRangeTFPD: "week",
      timeRangeTFPT: "week"
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
    const { timeRangeBBT, timeRangeSHDT, timeRangeTFPD, timeRangeTFPT } = this.state.currentTimeRange;
    const dataBBT = await connectServer("BBT", timeRangeBBT);
    const dataSHDT = await connectServer("SHDT", timeRangeSHDT);
    const dataTFPT = await connectServer("TFPT", timeRangeTFPT);
    const dataTFPD = await connectServer("TFPD", timeRangeTFPD);

    this.setState({ api: { dataBBT, dataSHDT, dataTFPD, dataTFPT } });
  }

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
      const currentTimeRange = `timeRange${id}`; // timeRangeTFPT, timeRangeSHDT, etc...

      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = filteredData;
      return { nextUpdate };
    });
  }

  render() {
    /**
     * Data from express server
     */
    const { dataBBT, dataSHDT, dataTFPT } = this.state.api;

    /**
     * When a LineChart component is created, the "id" must match the ones required
     * by the "LineChart" component. Refer to the component definition for more details
     */
    const graphBBT = <LineChart id="BBT" data={[{ id: "Bigbag powder", data: dataBBT }]} />
    const graphSHDT = <LineChart id="SHDT" data={[{ id: "SHD powder", data: dataSHDT }]} />
    const graphTFPT = <LineChart id="TFPT" data={[{ id: "Total powder", data: dataTFPT }]} />

    return (
      <div className={styles.freshPowder}>
        <Row className={styles.top}>
          <Col className={styles.trendBox}>
            <GraphContext.Provider value={this.contextValueTFPT}>
              <GraphContainer {...propsTitleBarTFPT} graph={graphTFPT} />
            </GraphContext.Provider>
          </Col>

          <GraphContext.Provider value={this.contextValueTFPD}>
            <Col className={styles.deckBox}>
              <GraphContainer {...propsTitleBarTFPD} graph={graphTFPD} />
            </Col>
          </GraphContext.Provider>
        </Row>

        <Row className={styles.bottom}>
          <Col className={styles.trendBox}>
            <GraphContext.Provider value={this.contextValueSHDT}>
              <GraphContainer {...propsTitleBarSHDT} graph={graphSHDT} />
            </GraphContext.Provider>
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer {...propsTitleBarSHDD} graph={graphSHDD} />
          </Col>

          <Col className={[styles.trendBox, styles.prx].join(" ")}>
            <GraphContext.Provider value={this.contextValueBBT}>
              <GraphContainer {...propsTitleBarBBT} graph={graphBBT} />
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