import React from "react";
import { DatePicker } from 'antd';

import styles from "./Datepicker.module.css";

const { RangePicker } = DatePicker;

const Datepicker = () => (
  <RangePicker className={styles.datepicker} />
);

export default Datepicker;