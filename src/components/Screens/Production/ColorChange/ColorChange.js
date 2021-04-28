import React, { Component } from 'react';
import Card from "./utilities/Card";
import GraphContainer from "../../../Container/GraphContainer";
import GraphContext from "../../../Context/GraphContext";
import LineBarCardChart from "./utilities/LineBarCardChart";
import Table from "./utilities/Table";
import { Row, Col } from "antd";

import styles from "./ColorChange.module.css";
import processDataFromServer from "./utilities/handlersServer";
import { propsCCQL, propsCCD, propsCCAC, propsCCAT } from "./utilities/props";

class ColorChange extends Component {
  /**
 * [api]: Contains received data from express server
 * [currentTimeRange]: Contains selected time frame for all elements
 * [dataCCA, dataCCD, dataCCQL]: Holds data for "color_change_aborted.csv",
 * "color_change_duration.csv", "color_change_longest.csv", "color_change_quickest.csv"
 */
  state = {
    api: {
      dataCCA: [],
      dataCCD: [],
      dataCCQL: []
    },
    currentTimeRange: {
      currentTimeRangeCCA: "week",
      currentTimeRangeCCD: "week",
      currentTimeRangeCCQL: "week"
    }
  }

  /**
   * 1. Fetch data when component mounts for the first time
   * 2. Triggers automatic updates every "x" milliseconds
   */
   async componentDidMount() {
    //this.updateDataOnScreen();
    //this.timerID = setInterval(() => this.updateDataOnScreen(), 3600000);
  }

  // If component unmounts, then free memory resources
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * [updateDataOnScreen]: Trigger screen updates every "x" millisenconds
   */
  async updateDataOnScreen() {
    // Define id's to target all UI elements
    const { currentTimeRange } = this.state;
    const ids = ["CCA", "CCD", "CCQL"];

    // Get data for all elements
    const data = await Promise.all(ids.map(async (id) => {
      const timeRange = currentTimeRange[`currentTimeRange${id}`];
      return await processDataFromServer(id, timeRange);
    }));

    // Update state for all components
    this.setState(
      {
        api:
        {
          dataCCA: data[0],
          dataCCD: data[1],
          dataCCQL: data[2]
        }
      }
    );
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

  /**
  * [getDataFromServer]: Establish connection to express server via HTTP requests (GET, POST)
  * [id]: Helps to determine the correct endpoint, filename and axios instance
  * [timeRange]: It can be a string ("day", "week", "month") or an array of two "moment" objects
  */
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
  * @param {*} ids Arrays of ids (i.e "CCA", "CCD", "CCQL")
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
    const { dataCCA, dataCCD, dataCCQL } = this.state.api;

    // Current time range for elements
    const { currentTimeRangeCCD, currentTimeRangeCCQL } = this.state.currentTimeRange;

    // Create context values
    const ids = ["CCQL", "CCD", "CCA"];
    const contextValue = createContextValues(ids);

    // Line, bar chart UI components
    const BarChartCCQL = <LineBarCardChart id="CCQL" data={dataCCQL} timeRange={currentTimeRangeCCQL} />;
    const LineChartCCD = <LineBarCardChart id="CCD" data={dataCCD} timeRange={currentTimeRangeCCD} />;

    // Table, Card UI components
    const TableCCA = <Table data={dataCCA} {...propsCCAT} />;
    const CardCCA = <Card data={dataCCA} />;

    return (
      <Row className={styles.colorChange}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsCCQL} graph={BarChartCCQL} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[1]}>
              <GraphContainer {...propsCCD} graph={LineChartCCD} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer  {...propsCCAC} graph={CardCCA} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            {TableCCA}
          </div>
        </Col>
      </Row>
    );
  }
}

export default ColorChange;