import React, { useContext } from "react";
import { ReactComponent as Day } from "../../../../assets/svg/day.svg";
import { ReactComponent as Week } from "../../../../assets/svg/week.svg";
import { ReactComponent as Month } from "../../../../assets/svg/month.svg";

import styles from "./ControlButton.module.css";

// TEST MODE FOR CONTEXT
import { ThemeContext } from "../../../Screens/Consumption/SprayedPowder/utilities/context";


const ControlButton = ({ type }) => {


  const { user, setUser, id } = useContext(ThemeContext);

  console.log(user, id);


  return (
    <div
      className={styles.controlButton}
     
    >
      {type === "day" && <Day  onClick={(e) => {
        const newUser = { type }
        console.log(e.target)
        setUser(newUser,id);
      }} />}
      {type === "week" && <Week />}
      {type === "month" && <Month />}
    </div>
  );
}
export default ControlButton;