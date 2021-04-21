import React, { Component } from 'react';
import Deck from "../../../UI/Deck/CustomDeck/CustomDeck_2/CustomDeck_2";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import GraphContext from "../../../Context/GraphContext";
import LineChart from "./utilities/LineChart";
import { Row, Col } from "antd";

import styles from "./HumidityTemperature.module.css";
import processDataFromServer from "./utilities/handlersServer";
import { setCurrentValueDropdown } from "./utilities/miscellaneous";
import {
  propsDropdownHS,
  propsDropdownTS,
  propsTitleBarHSD,
  propsTitleBarHST,
  propsTitleBarTSD,
  propsTitleBarTST
} from "./utilities/props";

class HumidityTemperature extends Component {
  /**
  * [api]: Contains received data from express server
  * [currentTimeRange]: Contains selected time frame for trend and deck elements
  * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
  * [dataHSD, dataHST, dataTSD, dataTST]: Holds data for "sensor_humidity_x.csv", "sensor_temperature_x.csv" 
  * The "x" represents the sensor location
  */
  state = {
    api: {
      dataHSD:  {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        total: {
          totalTimeRange: 0,
          totalPrevTimeRange: 0
        }
      },
      dataTSD:  {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        total: {
          totalTimeRange: 0,
          totalPrevTimeRange: 0
        }
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
    this.updateDataOnScreen();
    this.timerID = setInterval(() => this.updateDataOnScreen(), 3600000);
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
    const { currentTimeRange, currentValueDropdown } = this.state;
    const ids = ["HSD", "HST", "TSD", "TST"];

    // Get data for all elements
    const data = await Promise.all(ids.map(async (id) => {
      const valueDropdown = currentValueDropdown[`currentValueDropdown${id}`];
      const timeRange = currentTimeRange[`currentTimeRange${id}`];
      return await processDataFromServer(valueDropdown, id, timeRange);
    }));

     // Update state for all components
     this.setState(
      {
        api:
        {
          dataHSD: data[0],
          dataHST: data[1],
          dataTSD: data[2],
          dataTST: data[3]
        }
      }
    );
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

    /**
    * Response data from server API. The data is formatted 
    * based on nivo library. If an error comes up, then 
    * "dataFromServer" is "false". Though I can exit the 
    * function at this point, I'll let it continue. Trends and 
    * deck elements handle the event of no-data using fallback data 
    */
    const dataFromServer = await processDataFromServer(currentValueDropdown, id, timeRange);

    // Update state of all elements
    this.setState(prevState => {
      const dataSelector = `data${id}`;
      const currentTimeRange = `currentTimeRange${id}`;
      const nextUpdate = { ...prevState };
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      nextUpdate.api[dataSelector] = dataFromServer;
      return { nextUpdate };
    });
  }

  /**
  * @param {*} ids Arrays of ids (i.e "TST", "HST", "TSD", "HSD")
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
    const { dataHSD, dataHST, dataTSD, dataTST } = this.state.api;

    // Current time range for elements
    const { currentTimeRangeHSD, currentTimeRangeTSD } = this.state.currentTimeRange;

    // Create context values
    const ids = ["TST", "HST", "TSD", "HSD"];
    const contextValue = createContextValues(ids);

    // Deck UI components
    const DeckHSD = <Deck data={dataHSD} timeRange={currentTimeRangeHSD} units="%" orientation="h" />;
    const DeckTSD = <Deck data={dataTSD} timeRange={currentTimeRangeTSD} units="°C" orientation="h" />;

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
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsTitleBarTST} graph={LineChartTST} dropdown={DropdownTS} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[1]}>
              <GraphContainer {...propsTitleBarHST} graph={LineChartHST} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer {...propsTitleBarTSD} graph={DeckTSD} dropdown={DropdownTS} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[3]}>
              <GraphContainer {...propsTitleBarHSD} graph={DeckHSD} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default HumidityTemperature;