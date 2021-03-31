import React, { Component } from 'react';
import Chart from "./utilities/CustomChart";
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";
import GraphContainer from "../../../Container/GraphContainer";
import { GraphContext } from "../../../Context/GraphContext";
import { Row, Col } from "antd";
import { propsSPCT, propsSPCTC, propsSPCR, propsSPCRC } from "./utilities/props";

import styles from "./SprayedPowder.module.css";
import { connectAPI, getFilenameEndpoint } from "./utilities/requestData";
import { dropdownOptionsSPCR } from "./configuration/dropdownOptions";

class SprayedPowder extends Component {
  
  state = {
    api: {
      dataSPCT: [],
      dataSPCR: []
    },
    dropdown: {
      currentValue: 1
    }
  }

  /**
   * Dropdown value property points to one specific recipe file
   */
  updateDropdownSelection = (e, { value }) => this.setState({ dropdown: { currentValue: value } })

  /**
   * Send "GET" and "POST" request to "express" server
   */
   getDataFromServer = async (id, timeRange) => {

    // Check if "timeRange" is an array or a string
    const requestByDatepicker = timeRange instanceof Array;

    // Get endpoint and filename for API requests
    const recipe = this.state.dropdown.currentValue;

    // This is valid for post requests
    const { filename, endpoint } = getFilenameEndpoint(id, timeRange, recipe);

    // Execute API requests. Then Filter data according to "Line" graph
    let filteredData;
    if (!requestByDatepicker) filteredData = await connectAPI.get(endpoint);
    if (requestByDatepicker) filteredData = await connectAPI.post("/", { filename, timeRange });

    // Update state based on data from express server
    const selector = `data${id}`;
    
    this.setState(prevState => {
      const nextUpdate = { ...prevState };
      nextUpdate.api[selector] = filteredData;
      return { nextUpdate };
    });
  }

  render() {
    const { dataSPCT, dataSPCR } = this.state.api;

    /**
     * Dropdowns: Sprayed powder calculated (trend/cards)
     */ 
    const dropdownSPCR = <Dropdown options={dropdownOptionsSPCR} />
    const dropdownSPCRC = <Dropdown options={dropdownOptionsSPCR} />

    /**
     * Graphs for containers
     */
    const graphSPCT = <Chart id="SPCT" data={[{ id: "Total", data: dataSPCT }]} />;
    const graphSPCR = <Chart id="SPCR" data={[{ id: "Recipe", data: dataSPCR }]} />;


    // Horizontal cards: SPCTC
    const dataSPCTC = [
      {
        label: "▲ Previous day:",
        previousValue: "390 kg",
        type: 1,
        value: 400,
        units: "kg"
      },
      {
        label: "▲ Previous month:",
        previousValue: "15 kg/h",
        type: 2,
        value: 16,
        units: "kg/h"
      }
    ];
    const cardsSPCTC = dataSPCTC.map(el => <CustomCard {...el} />);

    // Horizontal cards: SPCRC
    const dataSPCRC = [
      {
        label: "▲ Previous day:",
        previousValue: "390 kg",
        type: 1,
        value: 470,
        units: "kg"
      },
      {
        label: "▲ Previous day:",
        previousValue: "16 kg/h",
        type: 2,
        value: 19,
        units: "kg/h"
      }
    ];
    const cardsSPCRC = dataSPCRC.map(el => <CustomCard {...el} />);

    /**
     * Context values
     */
    const contextValueSPCT = {
      id: "SPCT", 
      getDataFromServer: this.getDataFromServer
    };

    const contextValueSPCR = {
      id: "SPCR",
      stateDropdown: this.state.dropdown.currentValue,
      getDataFromServer: this.getDataFromServer,
      updateDropdownSelection: this.updateDropdownSelection
    };

    return (
      <Row className={styles.sprayedPowder}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContext.Provider value={contextValueSPCT}>
              <GraphContainer {...propsSPCT} graph={graphSPCT} />
            </GraphContext.Provider>
          </div>

          <div className={styles.bottom}>
            <GraphContext.Provider value={contextValueSPCR}>
              <GraphContainer {...propsSPCR} graph={graphSPCR} dropdown={dropdownSPCR} />
            </GraphContext.Provider>
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContainer {...propsSPCTC} graph={<HorizontalCards cards={cardsSPCTC} />} />
          </div>

          <div className={styles.bottom}>
            <GraphContainer {...propsSPCRC} graph={<HorizontalCards cards={cardsSPCRC} />} dropdown={dropdownSPCRC} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default SprayedPowder;