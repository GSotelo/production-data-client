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
      { x: '2021-03-13T23:59:00.000Z', y: 7 },
      { x: '2021-04-13T23:59:00.000Z', y: 3 },
      { x: '2021-05-13T23:59:00.000Z', y: 7 },
      { x: '2021-06-13T23:59:00.000Z', y: 9 },
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
      { x: '2021-03-13T23:59:00.000Z', y: 17 },
      { x: '2021-04-13T23:59:00.000Z', y: 23 },
      { x: '2021-05-13T23:59:00.000Z', y: 17 },
      { x: '2021-06-13T23:59:00.000Z', y: 19 },
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