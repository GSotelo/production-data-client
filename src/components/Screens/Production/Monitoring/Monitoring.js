import React, { Component } from 'react';
import BarChart from "./utilities/BarChart";
import GraphContext from "../../../Context/GraphContext";
import Deck from "./utilities/Deck";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import PieChart from "./utilities/PieChart.js"
import { Row, Col } from "antd";

import styles from "./Monitoring.module.css";
import {
  propsTitleBarCS,
  propsTitleBarCVS,
  propsTitleBarLD,
  propsTitleBarRH,
  propsTitleBarSM,
  propsTitleBarSYS
} from "./props";


class Monitoring extends Component {


  getDataFromServer = async (id, timeRange) => {
    console.log("TRIGGER ELEMENT / TIMERANGE ARE:", id, timeRange);
  }

  /**
   * @param {*} ids Arrays of ids ("CS", "CVS", "LD", "RH", "SM", "SYS")
   * @returns Array of context values for graphs
   */
  createContextValues = (ids) => {
    const { getDataFromServer } = this;
    const baseContextValue = { getDataFromServer };

    return ids.map(id => (
      {
        ...baseContextValue,
        id,
      }
    ));
  }

  render() {
    // Extract some class methods
    const { createContextValues } = this;



    // TEMPORAL: HOW STATES SHOULD BE
    const dataConveyorSpeedState = [
      { x: '2021-03-13T23:59:00.000Z', y: 1 },
      { x: '2021-04-13T23:59:00.000Z', y: 23 },
      { x: '2021-05-13T23:59:00.000Z', y: 17 },
      { x: '2021-06-13T23:59:00.000Z', y: 9 },
    ];

    const dataCoatedSurfaceState = [
      { x: '2021-03-13T23:59:00.000Z', y: 17 },
      { x: '2021-04-13T23:59:00.000Z', y: 1 },
      { x: '2021-05-13T23:59:00.000Z', y: 3 },
      { x: '2021-06-13T23:59:00.000Z', y: 3 },
      { x: '2021-07-13T23:59:00.000Z', y: 19 },
      { x: '2021-08-13T23:59:00.000Z', y: 3 },
    ];

    // Esta forma tiene que seR dada dentro del componente EN SI
    const dataLineDensityState = [
      {
        "date": "2021/01/01",
        "Coated parts": 18
      },
      {
        "date": "2021/01/02",
        "Coated parts": 12
      },
      {
        "date": "2021/01/03",
        "Coated parts": 4
      },
      {
        "date": "2021/01/04",
        "Coated parts": 13
      },
      {
        "date": "2021/01/05",
        "Coated parts": 9
      },
      {
        "date": "2021/01/06",
        "Coated parts": 9

      },
      {
        "date": "2021/01/07",
        "Coated parts": 6
      },
      {
        "date": "2021/01/08",
        "Coated parts": 18
      },
      {
        "date": "2021/01/09",
        "Coated parts": 8
      },
      {
        "date": "2021/01/10",
        "Coated parts": 12
      },
      {
        "date": "2021/01/11",
        "Coated parts": 14
      },
      {
        "date": "2021/01/12",
        "Coated parts": 13
      },
      {
        "date": "2021/01/13",
        "Coated parts": 9
      },
      {
        "date": "2021/01/14",
        "Coated parts": 4

      },
      {
        "date": "2021/01/15",
        "Coated parts": 36
      },
      {
        "date": "2021/01/16",
        "Coated parts": 18
      },
      {
        "date": "2021/01/17",
        "Coated parts": 12
      },
      {
        "date": "2021/01/18",
        "Coated parts": 4
      },
      {
        "date": "2021/01/19",
        "Coated parts": 13
      },
      {
        "date": "2021/01/20",
        "Coated parts": 9
      }
    ];

    // Create context values
    const ids = ["RH", "SM", "SYS", "CS", "LD", "CVS"];
    const contextValue = createContextValues(ids);

    // Line chart UI components
    const LineChartCVS = <LineChart id="CVS" data={[{ id: "Speed", data: dataConveyorSpeedState }]} />;
    const LineChartCS = <LineChart id="CS" data={[{ id: "Area", data: dataCoatedSurfaceState }]} />;

    // Bar chart UI components
    const BarChartLD = <BarChart id="LD" data={"data"} />;

    // Pie chart UI components
    const PieChartSYS = <PieChart data={"data SYS"} />;
    const PieChartSM = <PieChart data={"data SM"} />;

    // Deck UI components
    const DeckRH = <Deck data="data" />

    return (
      <Row className={styles.monitoring}>
        <Col className={[styles.left, styles.pb0].join(" ")}>
          <div className={styles.small}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer  {...propsTitleBarRH} graph={DeckRH} />
            </GraphContext.Provider>
          </div>

          <div className={styles.small}>
            <GraphContext.Provider value={contextValue[1]} >
              <GraphContainer  {...propsTitleBarSM} graph={PieChartSM} />
            </GraphContext.Provider>
          </div>

          <div className={styles.small}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer  {...propsTitleBarSYS} graph={PieChartSYS} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.large} >
            <GraphContext.Provider value={contextValue[3]}>
              <GraphContainer  {...propsTitleBarCS} graph={LineChartCS} />
            </GraphContext.Provider>
          </div>

          <div className={[styles.group, styles.pb0].join(" ")}>
            <div>
              <div className={styles.medium}>
                <GraphContext.Provider value={contextValue[4]}>
                  <GraphContainer  {...propsTitleBarLD} graph={BarChartLD} />
                </GraphContext.Provider>
              </div>

              <div className={styles.medium}>
                <GraphContext.Provider value={contextValue[5]}>
                  <GraphContainer  {...propsTitleBarCVS} graph={LineChartCVS} />
                </GraphContext.Provider>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Monitoring;