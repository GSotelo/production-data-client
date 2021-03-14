import React, { Component } from 'react';
import { Row, Col } from "antd";

import styles from "./HumidityTemperature.module.css";

// TEST
import GraphContainer from "../../../Container/GraphContainer";
import { propsHS, propsHSC, propsTS, propsTSC } from "./utilities/props";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import CustomChart from "./utilities/CustomChart";
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";

// Dropdown options: Humidity sensor
const optionsHS = [
  { key: 1, text: "HS1", value: 1 },
  { key: 2, text: "HS2", value: 2 },
  { key: 3, text: "HS3", value: 3 },
  { key: 4, text: "HS4", value: 4 },
  { key: 5, text: "HS5", value: 5 }
];
//Dropdown: Humidity
const dropdownHS = <Dropdown options={optionsHS} />
//Dropdown: Electricity consumption card
const dropdownHSC = <Dropdown options={optionsHS} />

// Dropdown options: Temperature sensor
const optionsTS = [
  { key: 1, text: "TS1", value: 1 },
  { key: 2, text: "TS2", value: 2 },
  { key: 3, text: "TS3", value: 3 },
  { key: 4, text: "TS4", value: 4 },
  { key: 5, text: "TS5", value: 5 }
];
//Dropdown: Air consumption
const dropdownTS = <Dropdown options={optionsTS} />
//Dropdown: Air consumption card
const dropdownTSC = <Dropdown options={optionsTS} />

/**
 * dataTS: Data for temperature sensor
 * graphTS: Graph for temperature sensor
 */
const dataTS = [
  {
    id: 'Temperature',
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 17 },
      { x: '2021-04-13T23:59:00.000Z', y: 23 },
      { x: '2021-05-13T23:59:00.000Z', y: 17 },
      { x: '2021-06-13T23:59:00.000Z', y: 19 },
    ]
  }
];
const graphTS = <CustomChart id="TS" data={dataTS}/>

/**
 * dataHS: Data for humidity sensor
 * graphHS: Graph for humidity sensor
 */
const dataHS = [
  {
    id: 'Humidity',
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 17 },
      { x: '2021-04-13T23:59:00.000Z', y: 13 },
      { x: '2021-05-13T23:59:00.000Z', y: 17 },
      { x: '2021-06-13T23:59:00.000Z', y: 1 },
    ]
  }
];
const graphHS = <CustomChart id="HS" data={dataHS}/>

// Horizontal cards: Temperature sensor
const dataTSC = [
  {
    label: "▼ Previous month:",
    previousValue: "37°C",
    type: 1,
    value: 33,
    units: "°C"
  },
  {
    type: 2,
    value: 40,
    units: "°C"
  },
  {
    type: 3,
    value: 17,
    units: "°C"
  }
];
const cardsTS = dataTSC.map(el => <CustomCard {...el} />);
const deckTS = <HorizontalCards cards ={cardsTS}/>

// Horizontal cards: Humidity sensor
const dataHSC = [
  {
    label: "▲ Previous month:",
    previousValue: "46%",
    type: 1,
    value: 47,
    units: "%"
  },
  {
    type: 2,
    value: 73,
    units: "%"
  },
  {
    type: 3,
    value: 31,
    units: "%"
  }
];
const cardsHS = dataHSC.map(el => <CustomCard {...el} />);
const deckHS = <HorizontalCards cards ={cardsHS}/>

class HumidityTemperature extends Component {

  render() {
    return (
      <Row className={styles.humidityTemperature}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContainer 
              {...propsTS} 
              graph={graphTS}
              dropdown={dropdownTS}               
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer 
              {...propsHS} 
              graph={graphHS}
              dropdown={dropdownHS} 
            />
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContainer 
              {...propsTSC} 
              dropdown={dropdownTSC}
              graph={deckTS} 
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer 
              {...propsHSC}
              dropdown={dropdownHSC}
              graph={deckHS} 
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default HumidityTemperature;