import React, { Component } from 'react';
import Card from "./utilities_old/CustomCard";

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
} from "./utilities_old/propsCard";

class BatchDetails extends Component {

  render() {
    const {
      batchDetails,
      left,
      right,
      top,
      bottom
    } = styles;

    return (
      <Row className={batchDetails}>
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

export default BatchDetails;