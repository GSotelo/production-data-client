import React, { useContext } from "react";
import { ReactComponent as Day } from "../../../../assets/svg/day.svg";
import { ReactComponent as Week } from "../../../../assets/svg/week.svg";
import { ReactComponent as Month } from "../../../../assets/svg/month.svg";

import styles from "./ControlButton.module.css";

// TEST MODE FOR CONTEXT
import {GraphContext} from "../../../Context/GraphContext";

const ControlButton = ({ type }) => {


  const { id, requestData  } = useContext(GraphContext);

 

  return (
    <div
      className={styles.controlButton}
      onClick={() => {
        
        requestData(id, type);
      }}
    >
      {type === "day" && <Day />}
      {type === "week" && <Week />}
      {type === "month" && <Month />}
    </div>
  );
}
export default ControlButton;