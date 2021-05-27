import { ReactComponent as WhiteCross } from "../../../../assets/svg/whiteOff.svg";
import { ReactComponent as WhiteReset } from "../../../../assets/svg/whiteReset.svg";
import whiteCross from "../../../../assets/icons/whiteOff.ico";
import reset from "../../../../assets/icons/whiteReset.ico";

import styles from "./CloseButton.module.css";

const closeWindow = () => {
  window.open("about:blank", "_self");
  window.close();
}

const refreshWindow = () => {
  window.open("/", "_self");
  window.close();
}

const CloseButton = () => (
  <div className={styles.closeButton}>
    {/* <WhiteReset />  */}
    <img
      alt="close-application"
      src={reset}
      onClick={() => {
        closeWindow();
      }}
    />
  </div>
)

export default CloseButton;