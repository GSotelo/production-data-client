import React from "react";
import styles from "./ControlButton.module.css";

const ControlButton = (props) => (
  <div className={styles.controlButton}>
    {props.type}
  </div>
);

export default ControlButton;