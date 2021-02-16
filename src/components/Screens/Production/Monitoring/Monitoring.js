import React, { Component } from 'react';

//Testing mode

import styles from "./Monitoring.module.css";
import ControlBar from "../../../UI/ControlBar/ControlBar";


class Monitoring extends Component {

  render() {
    return (
      <div className={styles.monitoring}>
        <ControlBar />
      </div>
    );
  }
}

export default Monitoring;