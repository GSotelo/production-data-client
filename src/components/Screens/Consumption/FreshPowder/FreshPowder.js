import React, { Component } from 'react';
import { Row, Col } from "antd";
import   Deck  from "./utilities/CustomDeck";
import GraphContainer from "../../../Container/GraphContainer";
import { propsTFP, propsTFPC, propsSHD, propsSHDC, propsBB, propsBBC } from "./utilities/props";
import CustomChart from "./utilities/CustomChart";
import styles from "./FreshPowder.module.css";

/**
 * Data for deck: Total fresh powder
 */
const dataDeckTFP = [
  {
    icon: "total",
    id: "tfp_c1",
    value: 1798,
    units: "kg",
    label: "▲ Previous week:",
    previousValue: "1631 kg"
  },
  {
    icon: "average",
    id: "tfp_c2",
    value: 11,
    units: "kg",
    label: "▲ Previous week:",
    previousValue: "10 kg/h"
  }
];
const graphDeckTFP = <Deck orientation="horizontal" deck={dataDeckTFP}/>;

/**
 * Data for deck: Spectrum HD
 */
const dataDeckSHD = [
  {
    icon: "total",
    id: "shd_c1",
    value: 1000,
    units: "kg",
    label: "▬ Previous week:",
    previousValue: "1000 kg"
  },
  {
    icon: "average",
    id: "shd_c2",
    value: 6,
    units: "kg/h",
    label: "▼ Previous week:",
    previousValue: "7 kg/h"
  }
];
const graphDeckSHD = <Deck orientation="vertical" deck={dataDeckSHD}/>;

/**
 * Data for deck: Big bag
 */
const dataDeckBB = [
  {
    icon: "total",
    id: "bb_c1",
    value: 798,
    units: "kg",
    label: "▲ Previous week:",
    previousValue: "631 kg"
  },
  {
    icon: "average",
    id: "bb_c2",
    value: 5,
    units: "kg/h",
    label: "▬ Previous week:",
    previousValue: "5 kg/h"
  }
];
const graphDeckBB = <Deck orientation="vertical" deck={dataDeckBB}/>;

/**
 * Data for trend: Total fresh powder
 */
const dataTFP = [
  {
    id: 'Powder',
    data: [
      { x: '2021-01-01', y: 17 },
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
const graphTFP = <CustomChart id="TFP" data = {dataTFP}/>

/**
 * Data for trend: Spectrum hd
 */
const dataSHD = [
  {
    id: 'Powder',
    data: [
      { x: '2021-01-01', y: 17 },
      { x: '2021-01-02', y: 5 },
      { x: '2021-01-03', y: 1 },
      { x: '2021-01-04', y: 9 },
      { x: '2021-01-05', y: 12 },
      { x: '2021-01-06', y: 16 },
      { x: '2021-01-07', y: 3 },
      { x: '2021-01-08', y: 13 },
      { x: '2021-01-09', y: 13 },
      { x: '2021-01-10', y: 13 },
      { x: '2021-01-11', y: 7 },
      { x: '2021-01-12', y: 5 },
      { x: '2021-01-13', y: 1 },
      { x: '2021-01-14', y: 9 },
      { x: '2021-01-15', y: 12 },
      { x: '2021-01-16', y: 16 },
      { x: '2021-01-17', y: 3 },
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
      { x: '2021-01-30', y: 1 },
    ]
  }
];
const graphSHD = <CustomChart id="SHD" data = {dataSHD}/>

/**
 * Data for trend: Bigbag
 */
const dataBB = [
  {
    id: 'Powder',
    data: [
      { x: '2021-01-01', y: 7 },
      { x: '2021-01-02', y: 5 },
      { x: '2021-01-03', y: 11 },
      { x: '2021-01-04', y: 9 },
      { x: '2021-01-05', y: 12 },
      { x: '2021-01-06', y: 16 },
      { x: '2021-01-07', y: 13 },
      { x: '2021-01-08', y: 13 },
      { x: '2021-01-09', y: 13 },
      { x: '2021-01-10', y: 13 },
      { x: '2021-01-11', y: 17 },
      { x: '2021-01-12', y: 15 },
      { x: '2021-01-13', y: 11 },
      { x: '2021-01-14', y: 19 },
      { x: '2021-01-15', y: 12 },
      { x: '2021-01-16', y: 16 },
      { x: '2021-01-17', y: 13 },
      { x: '2021-01-18', y: 3 },
      { x: '2021-01-19', y: 13 },
      { x: '2021-01-20', y: 3 },
      { x: '2021-01-21', y: 7 },
      { x: '2021-01-22', y: 5 },
      { x: '2021-01-23', y: 11 },
      { x: '2021-01-24', y: 19 },
      { x: '2021-01-25', y: 12 },
      { x: '2021-01-26', y: 16 },
      { x: '2021-01-27', y: 13 },
      { x: '2021-01-28', y: 13 },
      { x: '2021-01-29', y: 13 },
      { x: '2021-01-30', y: 11 },
    ]
  }
];
const graphBB = <CustomChart id="BB" data = {dataBB}/>



class FreshPowder extends Component {

  render() {
    return (
      <div className={styles.freshPowder}>
        <Row className={styles.top}>
          <Col className={styles.trendBox}>
            <GraphContainer
              {...propsTFP}
              graph={graphTFP}
            />
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer
              {...propsTFPC}
              graph={graphDeckTFP}
            />
          </Col>
        </Row>

        <Row className={styles.bottom}>
          <Col className={styles.trendBox}>
            <GraphContainer
              {...propsSHD}
              graph={graphSHD}
            />
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer
              {...propsSHDC}
              graph={graphDeckSHD}
            />
          </Col>

          <Col className={[styles.trendBox, styles.prx].join(" ")}>
            <GraphContainer
              {...propsBB}
              graph={graphBB}
            />
          </Col>

          <Col className={styles.deckBox}>
            <GraphContainer
              {...propsBBC}
              graph={graphDeckBB}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FreshPowder;