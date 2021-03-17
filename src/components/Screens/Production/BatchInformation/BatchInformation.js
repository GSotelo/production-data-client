import React, { Component } from 'react';
import Card from "./utilities/CustomCard";


import styles from "./BatchInformation.module.css";
import { Row, Col } from "antd";
import { 
  propsSystemInformation, 
  propsEstimatedCosts,
  propsConsumption,
  propsColorChange,
  propsConveyorInformation,
  propsInstrumentation,
  propsBatchInformation 
} from "./utilities/propsCard";

class BatchInformation extends Component {

  render() {
    const {
      batchInformation,
      left,
      right,
      top,
      bottom
    } = styles;

    return (
      <Row className={batchInformation}>
        <Col className={left}>
          <Card {...propsBatchInformation} />
        </Col>

        <Col className={right}>
          <div className={top}>
            <Card {...propsSystemInformation} />
            <Card {...propsEstimatedCosts} />
            <Card {...propsConsumption} />
          </div>

          <div className={bottom}>
            <Card {...propsColorChange} />
            <Card {...propsConveyorInformation} />
            <Card {...propsInstrumentation} />
          </div>
        </Col>
      </Row>
    );
  }
}

export default BatchInformation;