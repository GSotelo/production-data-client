import React, { useContext } from "react";
import { DatePicker } from 'antd';

import styles from "./Datepicker.module.css";

import { GraphContext } from "../../Context/GraphContext";

const { RangePicker } = DatePicker;

const Datepicker = () => {
  const { id, getDataFromServer } = useContext(GraphContext);
  return (
    <RangePicker onChange={(a, b) => {
      getDataFromServer(id, a);
    }} className={styles.datepicker} />
  );
};

export default Datepicker;