import React, { Component } from 'react';
import Chart from "./utilities/CustomChart";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";
import GraphContainer from "../../../Container/GraphContainer";
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";
import { Row, Col } from "antd";

import { propsSPCT, propsSPCTC, propsSPCR, propsSPCRC } from "./utilities/props";
import styles from "./SprayedPowder.module.css";


// TEST MODE
import { ThemeContext } from "./utilities/context";

class SprayedPowder extends Component {

  // TEST
  state = {
    user: {},
  }

  // Method to update state
  setUser = (user,id) => {
    console.log("[GENERAL]: Updating user with id:", id);
    this.setState((prevState) => ({ user }))
  }



  render() {

    // Dropdown options: Sprayed powder calculated recipe
    const optionsSPCR = [
      { key: 1, text: 'RE1', value: 1 },
      { key: 2, text: 'RE2', value: 2 },
      { key: 3, text: 'RE3', value: 3 },
      { key: 4, text: 'RE4', value: 4 }
    ];
    // Dropdown: Sprayed powder calculated recipe
    const dropdownSPCR = <Dropdown options={optionsSPCR} />
    // Dropdown: Sprayed powder calculated recipe card
    const dropdownSPCRC = <Dropdown options={optionsSPCR} />

    // Data for SPCT
    const dataSPCT = [
      {
        id: 'Total',
        data: [
          { x: '2021-01-01', y: 7 },
          { x: '2021-01-02', y: 5 },
          { x: '2021-01-03', y: 11 },
          { x: '2021-01-04', y: 9 },
          { x: '2021-01-05', y: 12 },
          { x: '2021-01-06', y: 16 },
          { x: '2021-01-07', y: 3 },
          { x: '2021-01-08', y: 13 },
          { x: '2021-01-09', y: 13 },
          { x: '2021-01-10', y: 13 },
          { x: '2021-01-11', y: 7 },
          { x: '2021-01-12', y: 5 },
          { x: '2021-01-13', y: 11 },
          { x: '2021-01-14', y: 9 },
          { x: '2021-01-15', y: 12 },
          { x: '2021-01-16', y: 16 },
          { x: '2021-01-17', y: 13 },
          { x: '2021-01-18', y: 3 },
          { x: '2021-01-19', y: 13 },
          { x: '2021-01-20', y: 3 },
          { x: '2021-01-21', y: 7 },
          { x: '2021-01-22', y: 5 },
          { x: '2021-01-23', y: 11 },
          { x: '2021-01-24', y: 9 },
          { x: '2021-01-25', y: 12 },
          { x: '2021-01-26', y: 16 },
          { x: '2021-01-27', y: 13 },
          { x: '2021-01-28', y: 13 },
          { x: '2021-01-29', y: 13 },
          { x: '2021-01-30', y: 11 },
        ]
      }
    ];

    // Data for SPCR
    const dataSPCR = [
      {
        id: 'Recipe',
        data: [
          { x: '2021-01-01', y: 17 },
          { x: '2021-01-02', y: 5 },
          { x: '2021-01-03', y: 1 },
          { x: '2021-01-04', y: 9 },
          { x: '2021-01-05', y: 2 },
          { x: '2021-01-06', y: 16 },
          { x: '2021-01-07', y: 3 },
          { x: '2021-01-08', y: 13 },
          { x: '2021-01-09', y: 13 },
          { x: '2021-01-10', y: 16 },
          { x: '2021-01-11', y: 7 },
          { x: '2021-01-12', y: 5 },
          { x: '2021-01-13', y: 1 },
          { x: '2021-01-14', y: 6 },
          { x: '2021-01-15', y: 2 },
          { x: '2021-01-16', y: 16 },
          { x: '2021-01-17', y: 11 },
          { x: '2021-01-18', y: 3 },
          { x: '2021-01-19', y: 13 },
          { x: '2021-01-20', y: 3 },
          { x: '2021-01-21', y: 7 },
          { x: '2021-01-22', y: 5 },
          { x: '2021-01-23', y: 11 },
          { x: '2021-01-24', y: 9 },
          { x: '2021-01-25', y: 12 },
          { x: '2021-01-26', y: 16 },
          { x: '2021-01-27', y: 11 },
          { x: '2021-01-28', y: 13 },
          { x: '2021-01-29', y: 3 },
          { x: '2021-01-30', y: 16 },
        ]
      }
    ];

    // Graph: SPCT
    const graphSPCT = <Chart id="SPCT" data={dataSPCT} />;

    // Graph: SPCR
    const graphSPCR = <Chart id="SPCR" data={dataSPCR} />;

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



    //const user = { name: 'Tania', loggedIn: true }


    return (
      <Row className={styles.sprayedPowder}>
        <Col className={styles.left}>
          <div className={styles.top}>


            <ThemeContext.Provider value={{ user: this.state.user, setUser: this.setUser, id: "SPCT" }}>
              <GraphContainer {...propsSPCT} graph={graphSPCT} />
            </ThemeContext.Provider>


          </div>

          <div className={styles.bottom}>

            {/* <ThemeContext.Provider value={{ user: this.state.user, setUser: this.setUser, id: "SPCR" }}>
            </ThemeContext.Provider> */}
              <GraphContainer {...propsSPCR} graph={graphSPCR} dropdown={dropdownSPCR} />

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