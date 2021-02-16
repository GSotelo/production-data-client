import React from "react";
import styles from "./Dropdown.module.css";
import { Dropdown } from 'semantic-ui-react';

const ControlledDropdown = ({ options }) => {
  return (
    <Dropdown
      className={styles.dropdown}
      options={options}
      placeholder="Select"
      selection
    />
  );
};

export default ControlledDropdown;

// const options = [
    //   { key: 1, text: 'One', value: 1 },
    //   { key: 2, text: 'Two', value: 2 },
    //   { key: 3, text: 'Three', value: 3 },
    //   { key: 4, text: 'Four', value: 4 }
    // ]