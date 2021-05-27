import { ReactComponent as WhiteCross } from "../../../../assets/svg/whiteOff.svg";
import styles from "./CloseButton.module.css";
import whiteCross from "../../../../assets/icons/whiteOff.ico";

const closeWindow = () => {
  // window.open("about:blank", "_parent");
  // window.close();
  // Do something...
}

const CloseButton = () => (
  <div className={styles.closeButton}>
    {/* <WhiteCross /> */}
    <img
      alt="close-application"
      src={whiteCross}
      onClick={() => {
        closeWindow();
      }}
    />
  </div>
)

export default CloseButton;