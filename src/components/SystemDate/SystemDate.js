import React, { Component } from "react";
import { Row, Col } from "antd";
import { formatDate } from "./utilities/formatDate";
import styles from "./SystemDate.module.css";

class SystemDate extends Component {

  // State management
  state = { currentDate: new Date(), formattedDate: {} }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState(
        {
          currentDate: new Date(),
          formattedDate: formatDate(this.state.currentDate)
        }
      );
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const formattedDate = this.state.formattedDate;
    return (
      <Row className={styles.h100}>
        <Col span={24} className={styles.h50}>
          {`${formattedDate.hours}:${formattedDate.minutes}:${formattedDate.seconds}`}
        </Col>

        <Col span={24} className={styles.h50}>
          {`${formattedDate.weekdayName}, ${formattedDate.month} ${formattedDate.weekdayNumber}, ${formattedDate.year}`}
        </Col>
      </Row>
    )
  }
}

export default SystemDate;