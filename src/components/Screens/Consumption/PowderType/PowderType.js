import React, { Component } from "react";
import { Row, Col } from "antd";

import styles from "./PowderType.module.css";

// TEST
import GraphContainer from "../../../Container/GraphContainer";
import { propsCPT } from "./utilities/props";
import CustomChart from "./utilities/CustomChart";
import Dropdown from "../../../UI/Dropdown/Dropdown";

/**
 * dataCPT1: Data for powder consumption per type - 1 (CPT1)
 * graphCPT1: Graph for powder consumption per type - 1 (CPT1)
 */
const dataCPT1 = [
  {
    id: "Powder",
    data: [
      { x: "2021-01-01", y: 2 },
      { x: "2021-01-02", y: 5 },
      { x: "2021-01-03", y: 1 },
      { x: "2021-01-04", y: 9 },
      { x: "2021-01-05", y: 2 },
      { x: "2021-01-06", y: 6 },
      { x: "2021-01-07", y: 3 },
      { x: "2021-01-08", y: 3 },
      { x: "2021-01-09", y: 3 },
      { x: "2021-01-10", y: 16 },
      { x: "2021-01-11", y: 7 },
      { x: "2021-01-12", y: 5 },
      { x: "2021-01-13", y: 1 },
      { x: "2021-01-14", y: 6 },
      { x: "2021-01-15", y: 2 },
      { x: "2021-01-16", y: 16 },
      { x: "2021-01-17", y: 1 },
      { x: "2021-01-18", y: 13 },
      { x: "2021-01-19", y: 13 },
      { x: "2021-01-20", y: 3 },
      { x: "2021-01-21", y: 7 },
      { x: "2021-01-22", y: 5 },
      { x: "2021-01-23", y: 11 },
      { x: "2021-01-24", y: 6 },
      { x: "2021-01-25", y: 2 },
      { x: "2021-01-26", y: 6 },
      { x: "2021-01-27", y: 11 },
      { x: "2021-01-28", y: 13 },
      { x: "2021-01-29", y: 13 },
      { x: "2021-01-30", y: 16 },
    ]
  }
];
const graphCPT1 = <CustomChart id="CPT1" data={dataCPT1} />

/**
 * dataCPT2: Data for powder consumption per type - 2 (CPT2)
 * graphCPT2: Graph for powder consumption per type - 2 (CPT2)
 */
const dataCPT2 = [
  {
    id: "Powder",
    data: [
      { x: "2021-01-01", y: 7 },
      { x: "2021-01-02", y: 5 },
      { x: "2021-01-03", y: 1 },
      { x: "2021-01-04", y: 4 },
      { x: "2021-01-05", y: 2 },
      { x: "2021-01-06", y: 16 },
      { x: "2021-01-07", y: 3 },
      { x: "2021-01-08", y: 13 },
      { x: "2021-01-09", y: 3 },
      { x: "2021-01-10", y: 16 },
      { x: "2021-01-11", y: 7 },
      { x: "2021-01-12", y: 15 },
      { x: "2021-01-13", y: 11 },
      { x: "2021-01-14", y: 6 },
      { x: "2021-01-15", y: 12 },
      { x: "2021-01-16", y: 16 },
      { x: "2021-01-17", y: 1 },
      { x: "2021-01-18", y: 3 },
      { x: "2021-01-19", y: 3 },
      { x: "2021-01-20", y: 3 },
      { x: "2021-01-21", y: 7 },
      { x: "2021-01-22", y: 5 },
      { x: "2021-01-23", y: 11 },
      { x: "2021-01-24", y: 6 },
      { x: "2021-01-25", y: 2 },
      { x: "2021-01-26", y: 6 },
      { x: "2021-01-27", y: 1 },
      { x: "2021-01-28", y: 3 },
      { x: "2021-01-29", y: 3 },
      { x: "2021-01-30", y: 6 },
    ]
  }
];
const graphCPT2 = <CustomChart id="CPT2" data={dataCPT2} />

// Dropdown options: Sprayed powder calculated recipe
const optionsCPT1 = [
  { key: 1, text: "RAL1", value: 1 },
  { key: 2, text: "RAL2", value: 2 },
  { key: 3, text: "RAL3", value: 3 },
  { key: 4, text: "RAL4", value: 4 }
];
// Dropdown: Sprayed powder calculated recipe
const dropdownCPT1 = <Dropdown options={optionsCPT1} />
// Dropdown: Sprayed powder calculated recipe
const dropdownCPT2 = <Dropdown options={optionsCPT1} />

class PowderType extends Component {

  render() {
    return (
      <Row className={styles.powderType}>
        <Col className={styles.left}>
          <div className={styles.top}>
            <GraphContainer
              {...propsCPT}
              dropdown={dropdownCPT1}
              graph={graphCPT1}
            />
          </div>

          <div className={styles.bottom}>
            <GraphContainer
              {...propsCPT}
              dropdown={dropdownCPT2}
              graph={graphCPT2}
            />
          </div>
        </Col>

        <Col className={styles.right}>

          <div className={styles.full}>TABLE</div>



        </Col>
      </Row>
    );
  }
}

export default PowderType;