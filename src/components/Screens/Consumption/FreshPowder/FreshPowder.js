import React, { Component } from 'react';
import Deck from "../../../UI/Deck/CustomDeck/CustomDeck_2/CustomDeck_2";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import GraphContainer from "../../../Container/GraphContainer";
import LineChart from "./utilities/LineChart";
import GraphContext from "../../../Context/GraphContext";
import { Row, Col } from "antd";

import styles from "./FreshPowder.module.css";
import processDataFromServer, { getDataForDropdown } from "./utilities/handlersServer";
import {
  propsDropdownBB,
  propsTitleBarBBT,
  propsTitleBarBBD,
  propsTitleBarSHDT,
  propsTitleBarSHDD,
  propsTitleBarTFPT,
  propsTitleBarTFPD,
} from "./utilities/props";

class FreshPowder extends Component {
  /**
   * Class fields (Belong to the class itself. Prototype chain not affected) 
   * These fields are used by the server to set options for dropdown elements
   */
  optionsDropdownBB = [{ key: 1, text: `BB1`, value: 1 }];

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
      dataBBD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        total: {
          totalTimeRange: 0,
          totalPrevTimeRange: 0
        }
      },
      dataSHDD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        total: {
          totalTimeRange: 0,
          totalPrevTimeRange: 0
        }
      },
      dataTFPD: {
        average: {
          avgTimeRange: 0,
          avgPrevTimeRange: 0
        },
        total: {
          totalTimeRange: 0,
          totalPrevTimeRange: 0
        },
      },
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
    // Load options for dropdowns
    const fallbackOptionsDropdown = [{ key: 1, text: `BB1`, value: 1 }];
    this.optionsDropdownBB = await getDataForDropdown("bigbags", fallbackOptionsDropdown);

    // Set automatic updates
    this.updateDataOnScreen();
    this.timerID = setInterval(() => this.updateDataOnScreen(), 3600000);
  }

  // If component unmounts, then free memory resources
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  async updateDataOnScreen() {
    // Define id's to target all UI elements
    const { currentTimeRange, currentValueDropdown } = this.state;
    const ids = ["BBT", "SHDT", "TFPD", "TFPT"];

    // // Get data for all elements
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
          dataBBD: data[0].dataDeck,
          dataBBT: data[0].dataTrend,
          dataSHDD: data[1].dataDeck,
          dataSHDT: data[1].dataTrend,
          dataTFPD: data[2],
          dataTFPT: data[3]
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
   * 
   * @param {*} id Target element to update
   * @param {*} dataFromServer Data from express server
   * @param {*} timeRange Current time range for selected element
   */
  updateState = (id, timeRange, dataFromServer) => {
    // Keep track of timeframe
    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      const currentTimeRange = `currentTimeRange${id}`;
      nextUpdate.currentTimeRange[currentTimeRange] = timeRange;
      return { nextUpdate };
    });

    // These id's must trigger data updates for their respective deck element (SHDD, BBD)
    if (id === "SHDT" || id === "BBT") {
      const baseSelector = id.slice(0, id.length - 1); // SHD, BB 
      const dataTrendSelector = `data${id}`; // SHDT, BBT
      const dataDeckSelector = `data${baseSelector}D`; // SHDD, BBD

      // Update state if SHDT, SHDT, BBD, BBT element and exit function
      return this.setState(prevState => {
        const nextUpdate = { ...prevState };
        nextUpdate.api[dataTrendSelector] = dataFromServer.dataTrend;
        nextUpdate.api[dataDeckSelector] = dataFromServer.dataDeck;
        return { nextUpdate };
      })
    }

    // Update state of TFPT, TFPD elements
    this.setState(prevState => {
      const dataSelector = `data${id}`;
      const nextUpdate = { ...prevState };
      nextUpdate.api[dataSelector] = dataFromServer;
      return { nextUpdate };
    });
  };

  /**
   * [getDataFromServer]: Establish connection to express server via HTTP requests (GET, POST)
   * [id]: Helps to determine the correct endpoint, filename and axios instance
   * [timeRange]: It can be a string ("day", "week", "month") or an array of two "moment" objects
   */
  getDataFromServer = async (id, timeRange) => {
    // Update value of selected dropdown
    const currentValueDropdown = this.state.currentValueDropdown["currentValueDropdownBBT"];

    /**
    * Response data from server API. The data is formatted 
    * based on nivo library. If an error comes up, then 
    * "dataFromServer" is "false". Though I can exit the 
    * function at this point, I'll let it continue. Trends and 
    * deck elements handle the event of no-data using fallback data 
    */
    const dataFromServer = await processDataFromServer(currentValueDropdown, id, timeRange);

    // Update state of all elements
    this.updateState(id, timeRange, dataFromServer);
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
    const { createContextValues, optionsDropdownBB } = this;

    // Data from express server
    const { dataBBD, dataBBT, dataSHDD, dataSHDT, dataTFPD, dataTFPT } = this.state.api;

    // Current time range for elements
    const { currentTimeRangeTFPD } = this.state.currentTimeRange;

    // Create context values
    const ids = ["TFPT", "TFPD", "SHDT", "BBT"];
    const contextValue = createContextValues(ids);

    // Deck UI components
    const DeckTFPD = <Deck data={dataTFPD} timeRange={currentTimeRangeTFPD} units="kg" orientation="h" />;
    const DeckSHDD = <Deck data={dataSHDD} timeRange={currentTimeRangeTFPD} units="kg" orientation="v" />;
    const DeckBBD = <Deck data={dataBBD} timeRange={currentTimeRangeTFPD} units="kg" orientation="v" />;

    // Dropdown UI components
    //const DropdownBB = <Dropdown {...propsDropdownBB} />;
    const DropdownBB = <Dropdown options={optionsDropdownBB} />;

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
              <GraphContainer {...propsTitleBarTFPD} graph={DeckTFPD} />
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
            <GraphContainer {...propsTitleBarSHDD} graph={DeckSHDD} />
          </Col>

          <Col className={[styles.trendBox, styles.prx].join(" ")}>
            <GraphContext.Provider value={contextValue[3]}>
              <GraphContainer {...propsTitleBarBBT} graph={LineChartBBT} dropdown={DropdownBB} />
            </GraphContext.Provider>
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer {...propsTitleBarBBD} graph={DeckBBD} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FreshPowder;