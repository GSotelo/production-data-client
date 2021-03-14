import React, { useContext } from "react";
import { DatePicker } from 'antd';

import styles from "./Datepicker.module.css";

import { GraphContext } from "../../Context/GraphContext";

const { RangePicker } = DatePicker;

const Datepicker = () => {
  const { id, requestData } = useContext(GraphContext);
  return (
    <RangePicker onChange={(a, b) => {
      requestData(id, a);
    }} className={styles.datepicker} />
  );
};

export default Datepicker;