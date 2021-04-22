import React, { Component } from 'react';
import Deck from "../../../UI/Deck/CustomDeck/CustomDeck_2/CustomDeck_2";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import GraphContext from "../../../Context/GraphContext";
import LineChart from "./utilities/LineChart";
import { Row, Col } from "antd";

import styles from "./SprayedPowder.module.css";
import processDataFromServer from "./utilities/handlersServer";
import { setCurrentValueDropdown } from "./utilities/miscellaneous";
import {
  propsDropdownSPCR,
  propsTitleBarSPCRD,
  propsTitleBarSPCRT,
  propsTitleBarSPCTD,
  propsTitleBarSPCTT
} from "./utilities/props";

class SprayedPowder extends Component {
  /**
  * [api]: Contains received data from express server
  * [currentTimeRange]: Contains selected time frame for trend and deck elements
  * [currentValueDropdown]: Contains current value of dropdown for trend and deck elements
  * [dataSPCRD, dataSPCRT, dataSPCTD, dataSPCTT]: Holds data for "sprayed_powder_total.csv", "sprayed_powder_recipe_x.csv" 
  * The "x" represents recipe number
  */
  state = {
    api: {
      dataSPCRD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        total: {
          totalTimeRange: 0,
          totalPrevTimeRange: 0
        }
      },
      dataSPCTD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        total: {
          totalTimeRange: 0,
          totalPrevTimeRange: 0
        }
      },
      dataSPCRT: [],
      dataSPCTT: [],
    },
    currentTimeRange: {
      currentTimeRangeSPCRD: "week",
      currentTimeRangeSPCRT: "week",
      currentTimeRangeSPCTT: "week",
      currentTimeRangeSPCTD: "week"
    },
    currentValueDropdown: {
      currentValueDropdownSPCRD: 1,
      currentValueDropdownSPCRT: 1,
      currentValueDropdownSPCTD: 1,
      currentValueDropdownSPCTT: 1,
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
    const ids = ["SPCRD", "SPCRT", "SPCTD", "SPCTT"];

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
          dataSPCRD: data[0],
          dataSPCRT: data[1],
          dataSPCTD: data[2],
          dataSPCTT: data[3]
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
  * @param {*} ids Arrays of ids (i.e "SPCTT", "SPCRT", "SPCTD", "SPCRD")
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
    const { dataSPCRD, dataSPCRT, dataSPCTD, dataSPCTT } = this.state.api;

    // Current time range for elements
    const { currentTimeRangeSPCRD, currentTimeRangeSPCTD } = this.state.currentTimeRange;

    // Create context values
    const ids = ["SPCTT", "SPCRT", "SPCTD", "SPCRD"];
    const contextValue = createContextValues(ids);

    // Deck UI components
    const DeckSPCRD = <Deck data={dataSPCRD} timeRange={currentTimeRangeSPCRD} units="kg" orientation="h" />;
    const DeckSPCTD = <Deck data={dataSPCTD} timeRange={currentTimeRangeSPCTD} units="kg" orientation="h" />;

    // Dropdown UI components
    const DropdownHS = <Dropdown {...propsDropdownSPCR} />;

    // Line chart UI components
    const LineChartSPCRT = <LineChart id="SPCRT" data={[{ id: "Recipe", data: dataSPCRT }]} />;
    const LineChartSPCTT = <LineChart id="SPCTT" data={[{ id: "Total", data: dataSPCTT }]} />;

    return (
      <Row className={styles.sprayedPowder}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[0]}>
              <GraphContainer {...propsTitleBarSPCTT} graph={LineChartSPCTT} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[1]}>
              <GraphContainer {...propsTitleBarSPCRT} graph={LineChartSPCRT} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValue[2]}>
              <GraphContainer {...propsTitleBarSPCTD} graph={DeckSPCTD} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValue[3]}>
              <GraphContainer {...propsTitleBarSPCRD} graph={DeckSPCRD} dropdown={DropdownHS} />
            </GraphContext.Provider>
          </div>
        </Col>
      </Row>
    );
  }
}

export default SprayedPowder;