import React, { Component } from 'react';
import BarChart from "./utilities/BarChart";
import GraphContext from "../../../Context/GraphContext";
import Deck from "./utilities/Deck";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import PieChart from "./utilities/PieChart.js"
import { Row, Col } from "antd";

import styles from "./Monitoring.module.css";
import processDataFromServer from "./utilities/handlersServer";
import {
  propsTitleBarCS,
  propsTitleBarCVS,
  propsTitleBarLD,
  propsTitleBarRH,
  propsTitleBarSM,
  propsTitleBarSYS
} from "./utilities/props";


class Monitoring extends Component {

  state = {
    api: {
      dataCS: [],
      dataCVS: [],
      dataLD: [],
      dataRH: []
    },
    currentTimeRange: {
      currentTimeRangeCS: "week",
      currentTimeRangeCVS: "week",
      currentTimeRangeLD: "week",
      currentTimeRangeRH: "week",
    }
  }

  /**
   * 
   * @param {*} id Target element to update
   * @param {*} dataFromServer Data from express server
   * @param {*} timeRange Current time range for selected element
   */
  updateState = (id, dataFromServer, timeRange) => {
    const dataSelector = `data${id}`;
    const currentTimeRange = `currentTimeRange${id}`;

    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      nextUpdate.api[dataSelector] = dataFromServer;
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      return { nextUpdate };
    });
  }

  getDataFromServer = async (id, timeRange) => {
    /**
   * Response data from server API. The data is formatted 
   * based on nivo library. If an error comes up, then 
   * "dataFromServer" is "false". Though I can exit the 
   * function at this point, I'll let it continue. Trends and 
   * deck elements handle the event of no-data using fallback data 
   */
    const data = await processDataFromServer(id, timeRange);
    
    // Update state of all elements
    this.updateState(id, data, timeRange);
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

    // Data from express server
    const { dataCS, dataCVS, dataLD, dataRH } = this.state.api;

    // Create context values
    const ids = ["RH", "SM", "SYS", "CS", "LD", "CVS"];
    const contextValue = createContextValues(ids);

    // Line chart UI components
    const LineChartCVS = <LineChart id="CVS" data={dataCVS} />;
    const LineChartCS = <LineChart id="CS" data={dataCS} />;

    // Bar chart UI components
    const BarChartLD = <BarChart id="LD" data={dataLD} />;

    // Pie chart UI components
    const PieChartSYS = <PieChart id="SYS" data={"data SYS"} />;
    const PieChartSM = <PieChart id="SM" data={"data SM"} />;

    // Deck UI components
    const DeckRH = <Deck data={dataRH} />

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