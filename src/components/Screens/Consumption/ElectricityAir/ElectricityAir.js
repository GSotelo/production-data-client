import React, { Component } from "react";
import { Row, Col } from "antd";

import styles from "./ElectricityAir.module.css";

//TEST
import GraphContainer from "../../../Container/GraphContainer";
import { propsAC, propsACC, propsEC, propsECC } from "./utilities/props";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import CustomChart from "./utilities/CustomChart";
import HorizontalCards from "../../../UI/Cards/HorizontalCards/HorizontalCards";
import CustomCard from "../../../UI/Card/CustomCard/CustomCard";


// Dropdown options: Electricity consumption
const optionsEC = [
  { key: 1, text: "EC1", value: 1 },
  { key: 2, text: "EC2", value: 2 },
  { key: 3, text: "EC3", value: 3 },
  { key: 4, text: "EC4", value: 4 },
  { key: 5, text: "EC5", value: 5 }
];
//Dropdown: Electricity consumption
const dropdownEC = <Dropdown options={optionsEC} />
//Dropdown: Electricity consumption card
const dropdownECC = <Dropdown options={optionsEC} />

// Dropdown options: Air consumption
const optionsAC = [
  { key: 1, text: "AC1", value: 1 },
  { key: 2, text: "AC2", value: 2 },
  { key: 3, text: "AC3", value: 3 },
  { key: 4, text: "AC4", value: 4 },
  { key: 5, text: "AC5", value: 5 }
];
//Dropdown: Air consumption
const dropdownAC = <Dropdown options={optionsAC} />
//Dropdown: Air consumption card
const dropdownACC = <Dropdown options={optionsAC} />

/**
 * dataEC: Data for electricity consumption
 * graphEC: Graph for electricity consumption
 */
const dataEC = [
  {
    id: 'Electricity',
    data: [
      { x: '2021-01-01', y: 7 },
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
      { x: '2021-01-12', y: 15 },
      { x: '2021-01-13', y: 11 },
      { x: '2021-01-14', y: 6 },
      { x: '2021-01-15', y: 12 },
      { x: '2021-01-16', y: 16 },
      { x: '2021-01-17', y: 1 },
      { x: '2021-01-18', y: 3 },
      { x: '2021-01-19', y: 13 },
      { x: '2021-01-20', y: 3 },
      { x: '2021-01-21', y: 7 },
      { x: '2021-01-22', y: 5 },
      { x: '2021-01-23', y: 11 },
      { x: '2021-01-24', y: 16 },
      { x: '2021-01-25', y: 12 },
      { x: '2021-01-26', y: 16 },
      { x: '2021-01-27', y: 11 },
      { x: '2021-01-28', y: 13 },
      { x: '2021-01-29', y: 13 },
      { x: '2021-01-30', y: 16 },
    ]
  }
];
const graphEC = <CustomChart id="EC" data={dataEC} />

/**
 * dataEC: Data for electricity consumption
 * graphEC: Graph for electricity consumption
 */
const dataAC = [
  {
    id: 'Air flow',
    data: [
      { x: '2021-01-01', y: 7 },
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
      { x: '2021-01-12', y: 15 },
      { x: '2021-01-13', y: 11 },
      { x: '2021-01-14', y: 6 },
      { x: '2021-01-15', y: 12 },
      { x: '2021-01-16', y: 16 },
      { x: '2021-01-17', y: 1 },
      { x: '2021-01-18', y: 3 },
      { x: '2021-01-19', y: 13 },
      { x: '2021-01-20', y: 3 },
      { x: '2021-01-21', y: 7 },
      { x: '2021-01-22', y: 5 },
      { x: '2021-01-23', y: 11 },
      { x: '2021-01-24', y: 16 },
      { x: '2021-01-25', y: 12 },
      { x: '2021-01-26', y: 16 },
      { x: '2021-01-27', y: 11 },
      { x: '2021-01-28', y: 13 },
      { x: '2021-01-29', y: 13 },
      { x: '2021-01-30', y: 16 },
    ]
  }
];
const graphAC = <CustomChart id="AC" data={dataAC} />

// Horizontal cards: Electricity consumption
const dataECC = [
  {
    label: "▲ Previous day:",
    previousValue: "390 kW",
    type: 1,
    value: 437,
    units: "kg"
  },
  {
    type: 2,
    value: 440,
    units: "kW"
  },
  {
    type: 2,
    value: 410,
    units: "kW"
  }
];
const cardsEC = dataECC.map(el => <CustomCard {...el} />);
const deckEC = <HorizontalCards cards={cardsEC} />

// Horizontal cards: Electricity consumption
const dataACC = [
  {
    label: "▬ Previous day:",
    previousValue: "129 m3/h",
    type: 1,
    value: 129,
    units: "m3/h"
  },
  {
    type: 2,
    value: 170,
    units: "m3/h"
  },
  {
    type: 2,
    value: 110,
    units: "m3/h"
  }
];
const cardsAC = dataACC.map(el => <CustomCard {...el} />);
const deckAC = <HorizontalCards cards={cardsAC} />


class ElectricityAir extends Component {

  render() {
    return (
      <Row className={styles.electricityAir}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContainer
              {...propsEC}
              graph={graphEC}
              dropdown={dropdownEC}
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer
              {...propsAC}
              graph={graphAC}
              dropdown={dropdownAC}
            />
          </div>
        </Col>

        <Col className={styles.right}>
          <div className={styles.top}>
            <GraphContainer
              {...propsECC}
              dropdown={dropdownECC}
              graph={deckEC}
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer
              {...propsACC}
              dropdown={dropdownACC}
              graph={deckAC}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

export default ElectricityAir;