import React, { Component } from 'react';
import Deck from "./utilities/CustomDeck";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import { Row, Col } from "antd";

import styles from "./FreshPowder.module.css";
import {
  propsTitleBarBBT,
  propsTitleBarBBD,
  propsTitleBarSHDT,
  propsTitleBarSHDD,
  propsTitleBarTFPT,
  propsTitleBarTFPD,
} from "./utilities/propsTitleBar";

//  TEST
import { GraphContext } from "../../../Context/GraphContext";
import { connectServer } from "./utilities/connectServer";

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



const dataSHDT = [
  {
    id: 'Powder',
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 6 },
      { x: '2021-04-13T23:59:00.000Z', y: 13 },
      { x: '2021-05-13T23:59:00.000Z', y: 7 },
      { x: '2021-06-13T23:59:00.000Z', y: 23 },
    ]
  }
];

const dataBBT = [
  {
    id: 'Powder',
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 1 },
      { x: '2021-04-13T23:59:00.000Z', y: 12 },
      { x: '2021-05-13T23:59:00.000Z', y: 27 },
      { x: '2021-06-13T23:59:00.000Z', y: 1 },
    ]
  }
];

/**
 * When a LineChart component is created,
 * be sure the "id" matches the ones required
 * by the "LineChart" component. Refer to 
 * the component definition for more details
 */

const graphSHDT = <LineChart id="SHDT" data={dataSHDT} />
const graphBBT = <LineChart id="BBT" data={dataBBT} />

class FreshPowder extends Component {

  /**
   * [api]: Contains received data from express server
   * [dataTFP]: Total fresh powder data. Attempts to read "powder_total_fresh.csv"
   * [dataSHD]: Spectrum HD powder data. Attempts to read "powder_spectrum.csv"
   */
  state = {
    api: {
      dataTFPT: [],
      dataSHD: []
    }
  }

  /**
   * [getDataFromServer]
   */
  getDataFromServer = async (id, timeRange) => {
    const filteredData = await connectServer(id, timeRange);

    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      const selector = `data${id}`;
      nextUpdate.api[selector] = filteredData;
      return { nextUpdate };
    });

  }


  render() {

    const graphTFPT = <LineChart id="TFPT" data={[{ id: "Total", data: this.state.api.dataTFPT }]} />
    
    const contextValueTFPT = {
      id: "TFPT",
      requestData: this.getDataFromServer,
    };


    return (
      <div className={styles.freshPowder}>
        <Row className={styles.top}>
          <Col className={styles.trendBox}>
            <GraphContext.Provider value={contextValueTFPT}>
              <GraphContainer {...propsTitleBarTFPT} graph={graphTFPT} />
            </GraphContext.Provider>
          </Col>

          <GraphContext.Provider value={contextValueTFPT}>
            <Col className={styles.deckBox}>
              <GraphContainer {...propsTitleBarTFPD} graph={graphTFPD} />
            </Col>
          </GraphContext.Provider>
        </Row>

        <Row className={styles.bottom}>
          <Col className={styles.trendBox}>
            <GraphContext.Provider value={contextValueTFPT}>
              <GraphContainer {...propsTitleBarSHDT} graph={graphSHDT} />
            </GraphContext.Provider>
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer {...propsTitleBarSHDD} graph={graphSHDD} />
          </Col>

          <Col className={[styles.trendBox, styles.prx].join(" ")}>
            <GraphContext.Provider value={contextValueTFPT}>
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