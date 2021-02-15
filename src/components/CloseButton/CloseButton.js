import { ReactComponent as WhiteCross } from "../../assets/svg/whiteOff.svg";
import styles from "./CloseButton.module.css";

const CloseButton = () => (
  <div className={styles.closeButton}>
    <WhiteCross />
  </div>
)

export default CloseButton;