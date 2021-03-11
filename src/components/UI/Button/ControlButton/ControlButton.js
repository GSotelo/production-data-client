import React, { useContext } from "react";
import { ReactComponent as Day } from "../../../../assets/svg/day.svg";
import { ReactComponent as Week } from "../../../../assets/svg/week.svg";
import { ReactComponent as Month } from "../../../../assets/svg/month.svg";

import styles from "./ControlButton.module.css";

// TEST MODE FOR CONTEXT
import { ThemeContext } from "../../../Screens/Consumption/SprayedPowder/utilities/context";


const ControlButton = ({ type }) => {


  const { user, setUser, id } = useContext(ThemeContext);

 

  return (
    <div
      className={styles.controlButton}
      onClick={() => {
        const newUser = { type }
        setUser(newUser, id);
      }}
    >
      {type === "day" && <Day />}
      {type === "week" && <Week />}
      {type === "month" && <Month />}
    </div>
  );
}
export default ControlButton;