import React, { useContext } from "react";
import styles from "./Dropdown.module.css";
import { Dropdown } from 'semantic-ui-react';

import { GraphContext } from "../../Context/GraphContext";

const ControlledDropdown = ({ options }) => {
  const { stateDropdown, updateDropdownSelection } = useContext(GraphContext);
  return (
    <Dropdown
      className={styles.dropdown}
      options={options}
      placeholder="Select"
      selection
      onChange={updateDropdownSelection}
      value={stateDropdown}
    />
  );
};

export default ControlledDropdown;