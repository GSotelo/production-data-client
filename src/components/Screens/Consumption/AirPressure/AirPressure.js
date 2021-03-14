import React, { Component } from "react";
import { Row, Col } from "antd";

import styles from "./AirPressure.module.css";

// TEST
import GraphContainer from "../../../Container/GraphContainer";
import { propsAPS, propsAPSC } from "./utilities/props";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import CustomChart from "./utilities/CustomChart";
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";

// Dropdown options: Air pressure
const optionsAP = [
  { key: 1, text: "AP1", value: 1 },
  { key: 2, text: "AP2", value: 2 },
  { key: 3, text: "AP3", value: 3 },
  { key: 4, text: "AP4", value: 4 },
  { key: 5, text: "AP5", value: 5 }
];

//Dropdown: Air pressure (1)
const dropdownAP1 = <Dropdown options={optionsAP} />
//Dropdown: Air pressure (2)
const dropdownAP2 = <Dropdown options={optionsAP} />
//Dropdown: Air pressure (1) card
const dropdownAPC1 = <Dropdown options={optionsAP} />
//Dropdown: Air pressure (2) card
const dropdownAPC2 = <Dropdown options={optionsAP} />

/**
 * dataAP1: Data for air pressure sensor 1
 * graphAP1: Graph for air pressure sensor 1
 */
const dataAP1 = [
  {
    id: "Pressure",
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 7 },
      { x: '2021-04-13T23:59:00.000Z', y: 13 },
      { x: '2021-05-13T23:59:00.000Z', y: 7 },
      { x: '2021-06-13T23:59:00.000Z', y: 9 },
    ]
  }
];
const graphAP1 = <CustomChart id="AP1" data={dataAP1}/>

/**
 * dataAP2: Data for air pressure sensor 2
 * graphAP2: Graph for air pressure sensor 2
 */
const dataAP2 = [
  {
    id: "Pressure",
    data: [
      { x: '2021-03-13T23:59:00.000Z', y: 17 },
      { x: '2021-04-13T23:59:00.000Z', y: 23 },
      { x: '2021-05-13T23:59:00.000Z', y: 17 },
      { x: '2021-06-13T23:59:00.000Z', y: 1 },
    ]
  }
];
const graphAP2 = <CustomChart id="AP2" data={dataAP2}/>

// Horizontal cards: Air pressure 1
const dataAP1C = [
  {
    label: "▲ Previous month:",
    previousValue: "6.2 bar",
    type: 1,
    value: 6.3,
    units: "bar"
  },
  {
    type: 2,
    value: 7,
    units: "bar"
  },
  {
    type: 3,
    value: 5,
    units: "bar"
  }
];
const cardsAP1 = dataAP1C.map(el => <CustomCard {...el} />);
const deckAP1 = <HorizontalCards cards ={cardsAP1}/>

// Horizontal cards: Air pressure 2
const dataAP2C = [
  {
    label: "▲ Previous day:",
    previousValue: "6.2 bar",
    type: 1,
    value: 6.3,
    units: "bar"
  },
  {
    type: 2,
    value: 5.7,
    units: "bar"
  },
  {
    type: 3,
    value: 5.4,
    units: "bar"
  }
];
const cardsAP2 = dataAP2C.map(el => <CustomCard {...el} />);
const deckAP2 = <HorizontalCards cards ={cardsAP2}/>

class AirPressure extends Component {

  render() {
    return (
      <Row className={styles.airPressure}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContainer 
              {...propsAPS} 
              graph={graphAP1}
              dropdown={dropdownAP1} 
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer 
              {...propsAPS} 
              graph={graphAP2}
              dropdown={dropdownAP2} 
            />
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContainer 
              {...propsAPSC} 
              dropdown={dropdownAPC1} 
              graph={deckAP1}
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer 
              {...propsAPSC} 
              dropdown={dropdownAPC2} 
              graph={deckAP2}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default AirPressure;