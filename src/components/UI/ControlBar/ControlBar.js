import React from "react";
import ControlButton from "../Button/ControlButton";
import { ReactComponent as Day } from "../../../assets/svg/day.svg";
import { ReactComponent as Week } from "../../../assets/svg/week.svg";
import { ReactComponent as Month } from "../../../assets/svg/month.svg";
import styles from "./ControlBar.module.css";
import { Row, Col } from 'antd';

const ControlBar = () => (
  <Row className={styles.controlBar} >
    <Col span={7} className={styles.col}>
      <ControlButton type={<Day />} />
    </Col>

    <Col span={7} className={styles.col}>
      <ControlButton type={<Week />} />
    </Col>

    <Col span={7} className={styles.col}>
      <ControlButton type={<Month />} />
    </Col>
  </Row>
);

export default ControlBar;